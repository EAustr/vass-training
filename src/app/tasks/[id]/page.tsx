import TaskDetails from "@/components/task-details";

export default async function TaskDetailsPage({params, searchParams}: {params: {id: string}, searchParams: {edit?: string}}) {
  return (
    <div className="w-full max-w-lg">
      <TaskDetails id={params.id} searchParams={searchParams} />
    </div>
  );
}
