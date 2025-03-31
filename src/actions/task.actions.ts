"use server";

import { revalidatePath } from "next/cache";
import { Task, TASK_STATUS } from "../types/task.model";

// Mock database 
let tasks: Task[] = [];

export async function addTask(data: { title: string; description: string; type: string; status: TASK_STATUS }) {
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

export async function deleteTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
  revalidatePath("/");
}

export async function getTasks(): Promise<Task[]> {
  return tasks;
}
