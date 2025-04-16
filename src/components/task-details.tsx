import { getTaskById } from "@/actions/task.actions";
import { notFound } from "next/navigation";
import { Task } from "@/types/task.model";
import TaskEdit from "./task-edit";

type Props = {
  id: string;
  searchParams: { edit?: string };
};

export default async function TaskDetails({ id, searchParams }: Props) {
  const task: Task | null = await getTaskById(id);

  if (!task) {
    notFound();
  }

  const isEditing = searchParams.edit === "true";

  return (
    <div className="p-4 border rounded-lg shadow-md">
      {isEditing ? (
        <TaskEdit task={task} />
      ) : (
        <>
          <h3 className="font-bold text-xl mb-4">Task Details</h3>
          <p>
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <p>
            <strong>Type:</strong> {task.type}
          </p>
          <p>
            <strong>Status:</strong> {task.status.toUpperCase()}
          </p>
          <a
            href={`?edit=true`}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4 inline-block"
          >
            Edit
          </a>
        </>
      )}
    </div>
  );
}