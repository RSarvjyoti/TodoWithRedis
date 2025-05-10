import type { Task } from "../types";

export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:5000/fetchAllTasks");
  const data = await response.json();
  return data.tasks || [];
};
