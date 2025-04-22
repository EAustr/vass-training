import { getTaskById } from "@/actions/task.actions";
import { notFound } from "next/navigation";
import TaskEdit from "@/components/task-edit";

type Props = {
  params: { id: string };
};

export default async function TaskEditPage({ params }: Props) {
  const task = await getTaskById(params.id);

  if (!task) {
    notFound();
  }

  return (
    <div className="w-full p-4 border rounded-lg shadow-md">
      <TaskEdit task={task} />
    </div>
  );
}