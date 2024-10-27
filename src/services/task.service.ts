import { CreateTask } from "../controllers/task.controller";

import prisma from "../../prisma/prismaClient";

type Task = CreateTask & { id?: string; priority: number };
export const addTask = async (task: Task): Promise<Task> => {
  const taskCreated = await prisma.task.create({ data: task });
  return taskCreated;
};
export const getTaskById = async (id: string): Promise<Task | null> => {
  return await prisma.task.findFirst({ where: { id } });
};
export const getAllTasks = async (): Promise<Task[]> => {
  return await prisma.task.findMany();
};
