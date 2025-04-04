import { Task } from "@/types/task.model";
import { deleteTask } from "@/actions/task.actions";

export default function TaskDetails({ task }: { task: Task }) {
  return (
    <div className="p-4 border rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-bold text-xl">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <small className="block mt-2">
          {task.type} - {new Date(task.createdOn).toLocaleDateString("en-GB")} - {task.status.toUpperCase()}
        </small>
      </div>
      <form action={deleteTask}>
        <input type="hidden" name="id" value={task.id} />
        <button
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          style={{ cursor: "pointer" }}
        >
          Delete
        </button>
      </form>
    </div>
  );
}