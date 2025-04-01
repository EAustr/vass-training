"use server";
import { revalidatePath } from "next/cache";
import { Task, TaskFormSchema } from "../types/task.model";
import { z } from "zod";

// Mock database 
let tasks: Task[] = [];

export async function getTasks(): Promise<Task[]> {
  return tasks;
}

export async function addTask(data: any) {
  // Validate the data using Zod
  const parsedData = TaskFormSchema.safeParse(data);

  const newTask: Task = {
    id: Date.now(),
    title: data.title,
    description: data.description,
    type: data.type,
    createdOn: new Date().toISOString(),
    status: data.status,
  };
  tasks.push(newTask);
  revalidatePath("/");
}

const DeleteTaskSchema = z.object({
  id: z.number(),
});

export async function deleteTask(formData: FormData) {
  const  id  = Number(formData.get("id"));

  const parsedID = DeleteTaskSchema.safeParse({ id });
  // console.error(parsedID.error?.format());
  if (!parsedID.success) {
    // console.error("Invalid data provided for deleting a task:", parsedID.error);
    throw new Error("Invalid data provided for deleting a task");
  }

  tasks = tasks.filter((task) => task.id !== parsedID.data.id);
  revalidatePath("/");
}

