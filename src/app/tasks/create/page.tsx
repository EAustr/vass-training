import TaskForm from "@/components/task-form";

export default async function TaskCreatePage() {
  return (
    <main className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Task Creation</h1>
        <TaskForm />
      </div>
    </main>
  );
}
