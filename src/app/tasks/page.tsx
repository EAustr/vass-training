import TaskList from "@/components/task-list";

export default function TaskListPage() {
  return (
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Task List</h1>
        <TaskList />
      </div>
  );
}
