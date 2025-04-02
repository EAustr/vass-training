import TaskList from "@/components/task-list";

export default async function TaskListPage() {
  return (
    <main className="flex justify-center min-h-screen p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Task List</h1>
        <TaskList />
      </div>
    </main>
  );
}
