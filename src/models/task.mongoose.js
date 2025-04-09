import mongoose from "mongoose";
import { TASK_STATUS } from "../types/task.model.ts";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: Object.values(TASK_STATUS),
    default: TASK_STATUS.TODO,
  },
});

export const mTaskSchema = mongoose.model("Task", TaskSchema);