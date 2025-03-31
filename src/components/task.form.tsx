"use client";

import { useState } from "react";
import { addTask } from "../actions/task.actions";

const TaskForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    await addTask(formData);

    form.reset();
    // event.currentTarget.reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-md">
      <input name="title" placeholder="Title" required className="w-full p-2 border rounded" />
      <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded"></textarea>
      <input name="type" placeholder="Type" required className="w-full p-2 border rounded" />
      <select name="status" className="w-full p-2 border rounded">
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
