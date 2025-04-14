"use server";
import { revalidatePath } from "next/cache";
import { Task, TASK_STATUS, TaskFormSchema } from "../types/task.model";
import dbConnect from "@/lib/mongodb";
import { mTaskSchema } from "@/models/task.mongoose";

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
  }));
}

export async function addTask(data: any) {
  const parsedData = TaskFormSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid data provided for task creation");
  }

  const { title, description, type, status } = parsedData.data;
  const createdOn = new Date().toISOString();

  await dbConnect();
  const newTask = new mTaskSchema({
    title,
    description,
    type,
    createdOn,
    status,
  });

  await newTask.save();
  return {
    id: newTask._id.toString(),
    title,
    description,
    type,
    createdOn,
    status,
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
  const task = await mTaskSchema.findById(id).lean<{
    _id: { toString(): string };
    title: string;
    description: string;
    type: string;
    createdOn: string;
    status: string;
  }>();

  if (!task) return null;

  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    type: task.type,
    createdOn: task.createdOn,
    status: task.status as TASK_STATUS,
  };
}