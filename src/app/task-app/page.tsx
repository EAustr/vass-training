import { getTasks } from "../actions/task.actions"; 
import TaskForm from "../components/task.form"; 
import { Task } from "../types/task.model";

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

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="space-y-4 mt-6">
      {tasks.map((task) => (
        <li key={task.id} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <small>
              {task.type} - {new Date(task.createdOn).toLocaleDateString("en-GB")} - {task.status}
            </small>
          </div>
          <form action={"/delete-task"} method="POST">
            <input type="hidden" name="id" value={task.id} />
            <button
              type="submit"
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
