"use server";

import { revalidatePath } from "next/cache";
import { Task, TASK_STATUS } from "../types/task.model";

// Mock database 
let tasks: Task[] = [];

export async function addTask(data: FormData) {
  const newTask: Task = {
    id: Date.now(),
    title: data.get("title") as string,
    description: data.get("description") as string,
    type: data.get("type") as string,
    createdOn: new Date().toISOString(),
    status: data.get("status") as TASK_STATUS,
  };
  tasks.push(newTask);
  revalidatePath("/");
}

export async function deleteTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
  revalidatePath("/");
}

export async function getTasks(): Promise<Task[]> {
  return tasks;
}
