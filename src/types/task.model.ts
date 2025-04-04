import { z } from "zod";
// Enum for task statuses
export enum TASK_STATUS {
    TODO = "to-do",
    IN_PROGRESS = "in-progress",
    DONE = "done",
}
  

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.
  string()
  .min(10, {message: "Description must be atleast 10 charecters long"})
  .max(200, { message: "Description cant be more than 200 characters" }),
  type: z
  .string()
  .min(1, { message: "Type is required" }),
  createdOn: z.string(),
  status: z.nativeEnum(TASK_STATUS).default(TASK_STATUS.TODO),
})

//Zod schema for task input (used in forms)
export const TaskFormSchema = TaskSchema.omit({ id: true, createdOn: true });

export type Task = z.infer<typeof TaskSchema>;
export type TaskInput = z.infer<typeof TaskFormSchema>;
