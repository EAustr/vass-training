import TaskForm from "@/components/task-form";
import { getUsers } from "@/actions/user.actions";

export default async function TaskCreatePage() {
  const users = await getUsers();
  return (
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Task Creation</h1>
        <TaskForm users={users}/>
      </div>
  );
}
