import dbConnect from "@/lib/mongodb";
import { mTaskSchema } from "@/models/task.mongoose";
import { Task } from "@/types/task.model";

export async function getTasks(): Promise<Task[]> {
    await dbConnect();
    const tasks = await mTaskSchema.find({}).lean();

    return tasks.map((task: any) => ({
      ...task,
      id: task._id.toString(),
    }));
  }

  export default async function Page() {
    const tasks = await getTasks();
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>Task List</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>Title:</strong> {task.title} <br />
              <strong>Description:</strong> {task.description} <br />
              <strong>Type:</strong> {task.type} <br />
              <strong>Status:</strong> {task.status} <br />
              <strong>Created On:</strong>{" "}
              {task.createdOn ? new Date(task.createdOn).toLocaleString() : "N/A"} <br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }