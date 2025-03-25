"use client";
import { useState } from "react";

// Task Type Definition
interface Task {
  id: number;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: "todo" | "in-progress" | "done";
}

// Task Form Component
const TaskForm: React.FC<{ addTask: (task: Task) => void }> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !type) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      type,
      createdOn: new Date().toISOString(),
      status,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setType("");
    setStatus("todo");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as "todo" | "in-progress" | "done")}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">
        Add Task
      </button>
    </form>
  );
};

// Task List Component
const TaskList: React.FC<{ tasks: Task[]; deleteTask: (id: number) => void }> = ({ tasks, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <small>{task.type} - {new Date(task.createdOn).toLocaleDateString()} - {task.status}</small>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

// Main App Component
const TaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks([...tasks, task]);
  const deleteTask = (id: number) => setTasks(tasks.filter(task => task.id !== id));

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default TaskApp;
