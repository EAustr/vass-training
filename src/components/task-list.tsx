import { deleteTask, getTasks } from "@/actions/task.actions";
import Link from "next/link";


const TaskList = async() => {
  const tasks = await getTasks(); 

return (
    <ul className="space-y-4 mt-6">
      {tasks.map((task) => (
        <Link href={`/tasks/${task.id}`} key={task.id} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <small>
              {task.type} - {new Date(task.createdOn).toLocaleDateString("en-GB")} - {task.status.toUpperCase()}
            </small>
          </div>
          <form action={deleteTask}>
            <input type="hidden" name="id" value={task.id} />
            <button
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
              Delete
            </button>
          </form>
        </Link>
      ))}
    </ul>
  );
}

export default TaskList;