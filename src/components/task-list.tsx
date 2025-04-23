"use client";
import { deleteTask} from "@/actions/task.actions";
import Link from "next/link";
import { useTaskContext } from "@/app/context/task.context";

const TaskList = () => {
  const { tasks, deleteFromContext } = useTaskContext();

  const handleDelete = async (id: string) => {
    try{
      const formData = new FormData();
      formData.append("id", id);
      
      await deleteTask(formData);
      deleteFromContext(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ul className="space-y-4 mt-6">
      {tasks.map((task: Task) => (
        <li
          key={task.id}
          className="p-4 border rounded-lg shadow-md flex justify-between items-center"
        >
          <Link
            href={`/tasks/${task.id}`}
            className="flex-1"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <small>
                {task.type} - {new Date(task.createdOn).toLocaleDateString("en-GB")} -{" "}
                {task.status.toUpperCase()}
              </small>
            </div>
          </Link>
          <button
            onClick={() => handleDelete(task.id)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            style={{ cursor: "pointer" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;