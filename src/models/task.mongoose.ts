import mongoose, { InferSchemaType} from "mongoose";
import { TASK_STATUS } from "../types/task.model";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  createdOn: { type: String, default: () => new Date().toISOString() },
  status: {
    type: String,
    enum: Object.values(TASK_STATUS),
    default: TASK_STATUS.TODO,
  },
  assignedTo: { type: String, default: null },
});

export type TaskDoc = InferSchemaType<typeof TaskSchema> & { _id: mongoose.Types.ObjectId };
export const mTaskSchema = mongoose.models.Task || mongoose.model("Task", TaskSchema);