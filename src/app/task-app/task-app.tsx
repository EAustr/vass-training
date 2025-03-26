"use client";
import { useState } from "react";

type TaskType = TASK_STATUS;
enum TASK_STATUS {
  TODO = "To do",
  IN_PROGRESS = "In-progress",
  DONE = "Done",
}
// Task Type Definition
interface Task {
  id: number;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: TASK_STATUS;
}

// Task Form Component
const TaskForm: React.FC<{ addTask: (task: Task) => void }> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState<TaskType>(TASK_STATUS.TODO);

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
    setStatus(TASK_STATUS.TODO);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskType)}
        className="w-full p-2 border rounded"
      >
        <option value={TASK_STATUS.TODO}>To Do</option>
        <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
        <option value={TASK_STATUS.DONE}>Done</option>
      </select>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

// Task List Component
const TaskList: React.FC<{ tasks: Task[]; deleteTask: (id: number) => void }> = ({ tasks, deleteTask }) => {
  return (
    <ul className="space-y-4 mt-6">
      {tasks.map((task) => (
        <li key={task.id} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <small>
              {task.type} - {new Date(task.createdOn).toLocaleDateString()} - {task.status}
            </small>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
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
  const deleteTask = (id: number) => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default TaskApp;
