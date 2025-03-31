"use server";

import { revalidatePath } from "next/cache";
import { Task, TaskInputSchema } from "../types/task.model";
import { z } from "zod";

// Mock database 
let tasks: Task[] = [];

export async function getTasks(): Promise<Task[]> {
  return tasks;
}

export async function addTask(data: any) {
  // Validate the data using Zod
  const parsedData = TaskInputSchema.safeParse(data);

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

export async function deleteTask(data: any) {
  const parsedID = DeleteTaskSchema.safeParse(data);

  if (!parsedID.success) {
    throw new Error("Invalid data provided for deleting a task");
  }

  const { id } = parsedID.data;

  tasks = tasks.filter((task) => task.id !== id);
  revalidatePath("/");
}

