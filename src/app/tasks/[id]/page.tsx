import TaskDetails from "@/components/task-details";

export default async function TaskDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="w-full max-w-lg">
      <TaskDetails id={params.id} />
    </div>
  );
}
