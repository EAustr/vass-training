import TaskForm from "@/components/task-form";

export default function TaskCreatePage() {
  return (
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Task Creation</h1>
        <TaskForm />
      </div>
  );
}
