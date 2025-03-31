import { getTasks } from "../actions/task.actions";
import TaskForm from "../components/task.form";
import TaskList from "../components/task.list";

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <main className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>
        <TaskForm />
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
