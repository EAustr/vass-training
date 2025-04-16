import { updateTask } from "@/actions/task.actions";
import { Task } from "@/types/task.model";

type Props = {
  task: Task;
};

export default function TaskEdit({ task }: Props) {
  return (
    <div >
      <h3 className="font-bold text-xl mb-4">Edit Task</h3>
      <form action={updateTask} className="space-y-4">
        <input type="hidden" name="id" value={task.id} />
        <div className="max-w-5xl w-full mx-auto">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={task.title}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={task.description}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Type</label>
          <input
            type="text"
            name="type"
            defaultValue={task.type}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            defaultValue={task.status}
            className="w-full p-2 border rounded"
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}