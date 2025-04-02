"use server";

import Database from "better-sqlite3";
import path from "path";
import { revalidatePath } from "next/cache";
import { Task, TaskFormSchema } from "../types/task.model";
import { z } from "zod";

const db = new Database(path.join(process.cwd(), "database", "tasks.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    createdOn TEXT NOT NULL,
    status TEXT NOT NULL
  ) 
`);

export async function getTasks(): Promise<Task[]> {
  const rows = db.prepare("SELECT * FROM tasks").all();
  return rows as Task[];
}

export async function addTask(data: any) {
  // Validate the data using Zod
  const parsedData = TaskFormSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid data provided for task creation");
  }

  const { title, description, type, status } = parsedData.data;
  const createdOn = new Date().toISOString();

  db.prepare(
    "INSERT INTO tasks (title, description, type, createdOn, status) VALUES (?, ?, ?, ?, ?)"
  ).run(title, description, type, createdOn, status);

  revalidatePath("/task-app/task-list");
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

  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  revalidatePath("/task-app/task-list");
}

