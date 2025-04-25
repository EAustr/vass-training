"use server";
import { revalidatePath } from "next/cache";
import { Task, TASK_STATUS, taskFormSchema, taskUpdateSchema, UNASSIGNED, TaskInput } from "../types/task.model";
import dbConnect from "@/lib/mongodb";
import { mTaskSchema } from "@/models/task.mongoose";
import { redirect } from "next/navigation";
import { mUserSchema } from "@/models/user.mongoose";
import { Types } from "mongoose";
import { RawUser } from "@/actions/user.actions";

interface RawTask {
  _id: Types.ObjectId;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
  assignedTo?: string | null;
}

export async function getTasks(): Promise<Task[]> {
  await dbConnect();
  const tasks = await mTaskSchema.find({}).lean<RawTask[]>();

  return tasks.map((task): Task => ({
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn,
    status: task.status as TASK_STATUS,
    assignedTo: task.assignedTo || UNASSIGNED,
  }));
}

export async function addTask(data: TaskInput): Promise<Task> {
  const parsedData = taskFormSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid data provided for task creation");
  }

  const { title, description, type, status, assignedTo } = parsedData.data;

  await dbConnect();
  const createdTask = await mTaskSchema.create({
    title,
    description,
    type,
    status,
    assignedTo: assignedTo || UNASSIGNED,
    createdOn: new Date().toISOString(),
  });

  return {
    id: createdTask._id.toString(),
    title: createdTask.title,
    description: createdTask.description,
    type: createdTask.type,
    createdOn: createdTask.createdOn.toString(),
    status: createdTask.status,
    assignedTo: createdTask.assignedTo || UNASSIGNED,
  };
}

export async function deleteTask(formData: FormData) {
  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID format");
  }  

  await dbConnect();
  await mTaskSchema.findByIdAndDelete(id);
  revalidatePath("/tasks");
}

export async function getTaskById(id: string): Promise<Task | null> {
  await dbConnect();
  const task = await mTaskSchema.findById(id).lean<RawTask>();

  if (!task) return null;

  let assignedUser: string | undefined;
  if (task.assignedTo && task.assignedTo !== UNASSIGNED) {
    const user = await mUserSchema.findById(task.assignedTo).lean<RawUser>();
    assignedUser = user?._id?.toString() ?? undefined;
  }

  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn,
    status: task.status as TASK_STATUS,
    assignedTo: assignedUser,
  };
}

export async function updateTask(formData: FormData) {
  const inputData = Object.fromEntries(formData.entries());
  const parsedData = taskUpdateSchema.safeParse(inputData);

  if (!parsedData.success) {
    throw new Error("Invalid data provided for task update");
  }  
  
  const { id, title, description, type, status, assignedTo } = parsedData.data;
  await dbConnect();
  const updatedTask = await mTaskSchema.findByIdAndUpdate(
    id,
    { title, description, type, status, assignedTo },
    { new: true }
  );
  if (!updatedTask) {
    throw new Error("Task not found");
  }

  revalidatePath(`/tasks/${id}`);
  redirect(`/tasks/${id}`);
}