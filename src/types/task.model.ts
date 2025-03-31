// Enum for task statuses
export enum TASK_STATUS {
    TODO = "to-do",
    IN_PROGRESS = "in-progress",
    DONE = "done",
  }
  
  // Type alias for task status
  export type TaskType = TASK_STATUS;
  
  // Interface for a task
  // export interface Task {
  //   id: number;
  //   title: string;
  //   description: string;
  //   type: string;
  //   createdOn: string;
  //   status: TaskType;
  // }
  
  // Type for task form input
  export type Task = {
    id: number;
    title: string;
    description: string;
    type: string;
    createdOn: string;
    status: TaskType;
  };