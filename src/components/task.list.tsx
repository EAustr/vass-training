import { Task } from "@/types/task.model";



const TaskList = ({ tasks }: { tasks: Task[] }) => {

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

export default TaskList;