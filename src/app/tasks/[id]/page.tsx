import TaskDetails from "@/components/task-details";

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full max-w-lg">
      <TaskDetails id={params.id} />
    </div>
  );
}
