"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { Task } from "@/types/task.model";
import { getTasks } from "@/actions/task.actions";

type TaskContextType = {
  tasks: Task[];
  addToContext: (task: Task) => void;
  deleteFromContext: (taskId: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };
    fetchTasks();
  }, []);

  const addToContext = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteFromContext = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addToContext, deleteFromContext }}>
      {children}
    </TaskContext.Provider>
  );
};