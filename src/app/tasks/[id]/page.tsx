import { getTaskById } from "@/actions/task.actions";
import TaskDetails from "@/components/task-details";


export default async function TaskDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
 
  try {
    const task = await getTaskById(id);

    if (!task) {
      return <div>Task not found</div>;
    }

    return (
        <div className="w-full max-w-lg">
          <TaskDetails task={task} />
        </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    }
    return <div>An unknown error occurred</div>;
  }
}