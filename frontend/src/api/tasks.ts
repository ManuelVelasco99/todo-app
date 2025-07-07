import axios from 'axios';
import { Task } from '../types/task';

const urlTasks = import.meta.env.VITE_API_URL + "/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(urlTasks);
  return res.data;
};

export const updateTask = async (
  id: number,
  data: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Task> => {
  const res = await axios.put(`${urlTasks}/${id}`, data);
  return res.data;
};

export const deleteTask = async (
  id: number,
): Promise<Task> => {
  const res = await axios.delete(`${urlTasks}/${id}`);
  return res.data;
};

export const createTask = async (data: Partial<Task>): Promise<Task> => {
  const res = await axios.post(urlTasks, data);
  return res.data;
};