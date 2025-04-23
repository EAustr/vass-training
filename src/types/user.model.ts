import { z } from "zod";
import { extendZod } from "@zodyac/zod-mongoose";

export type User = {
  id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};


extendZod(z);
export const zUserSchema = z.object({
  id: z.string(),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
});

// Zod schema for user input (used in forms)
export const UserFormSchema = zUserSchema.omit({ id: true });

export type User = z.infer<typeof zUserSchema>;
export type UserInput = z.infer<typeof UserFormSchema>;