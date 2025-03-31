"use client";

import { Task } from "@/types/task.model";
import { deleteTask } from "@/actions/task.actions";


const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const handleDelete = async (id: number) => {
    await deleteTask({ id });
};

return (
    <ul className="space-y-4 mt-6">
      {tasks.map((task) => (
        <li key={task.id} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <small>
              {task.type} - {new Date(task.createdOn).toLocaleDateString("en-GB")} - {task.status.toUpperCase()}
            </small>
          </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;