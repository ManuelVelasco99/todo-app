import { prisma } from "../db/connection";
import { Task } from "@prisma/client";
import { CreateTaskInput } from "../validation/task.validation";
import { UpdateTaskInput } from "../validation/task.validation";

export const getTasks = async (): Promise<Task[]> => {
  return await prisma.task.findMany();
};

export const getTask = async (id: number) => {
  return await prisma.task.findUnique({
    where: { id },
  });
};


export const createTask = async (data: CreateTaskInput) => {
  return prisma.task.create({
    data,
  });
};

export const updateTask = async (id: number, data: UpdateTaskInput) => {
  return prisma.task.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const deleteTask = async (id: number): Promise<boolean> => {
  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) return false;

  await prisma.task.delete({ where: { id } });
  return true;
};
