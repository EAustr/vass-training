import { getTaskById } from "@/actions/task.actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { UNASSIGNED } from "@/types/task.model";

export default async function TaskDetailsPage({ params }: { params: { id: string } }) {
  const task = await getTaskById(params.id);

  if (!task) {
    notFound();
  }

  const assignedToDisplay = task.assignedTo?._id
    ? `${task.assignedTo.first_name} ${task.assignedTo.last_name} (${task.assignedTo.username})`
    : UNASSIGNED;

  return (
    <div className="p-4 border rounded-lg shadow-md">
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
      <p>
        <strong>Assigned To:</strong> {assignedToDisplay}
      </p>
      <Link href={`/tasks/${task.id}/edit`} className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4">
        Edit
      </Link>
    </div>
  );
}