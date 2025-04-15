import { getTaskById } from "@/actions/task.actions";
import { notFound } from "next/navigation";
import { Task } from "@/types/task.model";

type Props = {
  id: string;
};

export default async function TaskDetails({ id }: Props) {
  const task: Task | null = await getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <div className="p-4 border rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-bold text-xl">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <small className="block mt-2">
          {task.type} - {new Date(task.createdOn).toLocaleDateString("en-GB")} - {task.status.toUpperCase()}
        </small>
      </div>
    </div>
  );
}