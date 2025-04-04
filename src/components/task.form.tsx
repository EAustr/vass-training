"use client";

import { useForm } from "react-hook-form";
import { addTask } from "../actions/task.actions";
import { TaskInputSchema,TaskInput, TASK_STATUS } from "../types/task.model";
import { zodResolver } from "@hookform/resolvers/zod";

const TaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskInput>({
    resolver: zodResolver(TaskInputSchema),
  });

  const onSubmit = async (data: any) => {
    await addTask(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-lg shadow-md">

      <div>

      <input
       {...register("title")}
       placeholder="Title"
       className="w-full p-2 border rounded"
      />
      {errors.title && (<p className="error">{String(errors.title.message)}</p>)}
      </div>

      <div>
      <textarea 
        {...register("description",)}
          placeholder="Description" 
          className="w-full p-2 border rounded">
      </textarea>
      {errors.description && (<p className="error">{String(errors.description.message)}</p>)}
      </div>

      <div>
      <input
       {...register("type",)}
        placeholder="Type" 
        className="w-full p-2 border rounded" 
      />

      {errors.type && (<p className="error">{String(errors.type.message)}</p>)}
      </div>

      <div>

        <select {...register("status")} className="w-full p-2 border rounded">
          <option value={TASK_STATUS.TODO}>To Do</option>
          <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
          <option value={TASK_STATUS.DONE}>Done</option>
        </select>

        {errors.status && (<p className="error">{String(errors.status.message)}</p>)}
      </div>  
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;