import { z } from "zod";
import { extendZod } from "@zodyac/zod-mongoose";

// Enum for task statuses
export enum TASK_STATUS {
    TODO = "to-do",
    IN_PROGRESS = "in-progress",
    DONE = "done",
}

extendZod(z);

export const zTaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(200, { message: "Description can't be more than 200 characters" }),
  type: z.string().min(1, { message: "Type is required" }),
  createdOn: z.string(),
  status: z.nativeEnum(TASK_STATUS),
});

// Zod schema for task input (used in forms)
export const TaskFormSchema = zTaskSchema.omit({ id: true, createdOn: true });

export type Task = z.infer<typeof zTaskSchema>;
export type TaskInput = z.infer<typeof TaskFormSchema>;
