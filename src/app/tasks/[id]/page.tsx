import TaskDetails from "@/components/task-details";
import { getTaskById } from "@/actions/task.actions";
import Link from "next/link";

export default async function TaskDetailsPage({ params }: { params: { id: string } }) {
    const taskId = Number(params.id);

    if (!taskId) {
      return <p>Invalid task ID</p>;
    }
    const task = await getTaskById(taskId);
    if (!task) {
      return (
          <div className="w-full max-w-lg">
            <h1 className="text-2xl font-bold text-center mb-6">No tasks created</h1>
            <Link 
              href={"/tasks/create"}
              className="block text-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Create Task
            </Link>
          </div>
      );
    }

    return (
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Task Details</h1>
          <TaskDetails task={task}/>
        </div>
    );
  }
  