"use server";
import { revalidatePath } from "next/cache";
import { Task, TASK_STATUS, taskFormSchema, taskUpdateSchema, UNASSIGNED } from "../types/task.model";
import dbConnect from "@/lib/mongodb";
import { mTaskSchema } from "@/models/task.mongoose";
import { redirect } from "next/navigation";
import { mUserSchema } from "@/models/user.mongoose";

export async function getTasks(): Promise<Task[]> {
  await dbConnect();
  const tasks = await mTaskSchema.find({}).lean();

  return tasks.map((task: any) => ({
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn,
    status: task.status as TASK_STATUS,
    assignedTo: task.assignedTo || UNASSIGNED,
  }));
}

export async function addTask(data: any) {
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
  const task = await mTaskSchema.findById(id).lean();

  if (!task) return null;

  let assignedUser = null;
  if (task.assignedTo && task.assignedTo !== UNASSIGNED) {
    assignedUser = await mUserSchema.findById(task.assignedTo).lean();
  }

  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn instanceof Date ? task.createdOn.toISOString() : String(task.createdOn),
    status: task.status as TASK_STATUS,
    assignedTo: assignedUser || task.assignedTo
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