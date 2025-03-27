"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task, TASK_STATUS, TaskFormInput } from "../types/task.model";

// type TaskType = TASK_STATUS;
// enum TASK_STATUS {
//   TODO = "to-do",
//   IN_PROGRESS = "in-progress",
//   DONE = "done",
// }
// Task Type Definition
// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   type: string;
//   createdOn: string;
//   status: TASK_STATUS;
// }

// type TaskFormInput = {
//   title: string;
//   description: string;
//   type: string;
//   status: TaskType;
// }

// Task Form Component
const TaskForm: React.FC<{ addTask: (task: Task) => void }> = ({ addTask }) => {
  const {
    register, 
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInput>({
    defaultValues: {
      status: TASK_STATUS.TODO,
    },
  });

  const onSubmit: SubmitHandler<TaskFormInput> = (data) => {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      type: data.type,
      createdOn: new Date().toISOString(),
      status: data.status,
    };
    addTask(newTask);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-lg shadow-md">

      <div>
        <input
          {...register("title", {required: "Title is required"})}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        {errors.title && (<p className="error">{errors.title.message}</p>
      )}
      </div>
      <div>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength:{
              value: 10,
              message: "Description must be at least 10 characters"
            },
          })}
          placeholder="Description"
          className="w-full p-2 border rounded"
          />
          {errors.description && (<p className="error">{errors.description.message}</p>)}
      </div>
      
      <div>
        <input
          {...register("type", {required: "Type is required"})}
          placeholder="Type"
          className="w-full p-2 border rounded"
          />
          {errors.type && (<p className="error">{errors.type.message}</p>)}
      </div>
        
      <div>
        <select {...register("status")} className="w-full p-2 border rounded">
          <option value={TASK_STATUS.TODO}>To Do</option>
          <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
          <option value={TASK_STATUS.DONE}>Done</option>
        </select>
        {errors.status && (<p className="error">{errors.status.message}</p>)}
      </div>

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
              {task.type} - {new Date(task.createdOn).toLocaleDateString("en-GB")} - {task.status}
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
