import { ReceivedTask } from "../controllers/task.controller";

import NodeCache from "node-cache";
import prisma from "../../prisma/prismaClient";
import { TasksLogger } from "../app";

export type Task = ReceivedTask & {
  id?: string;
  priority: number;
  created_at?: Date;
};
const cache = new NodeCache({ stdTTL: 60 }); // Cache expires after 60 seconds

export const addTask = async (task: Task): Promise<Task> => {
  //omitting the created at field because server will generate new one.
  const { created_at, ...restTask } = task;

  const taskCreated = await prisma.task.create({ data: restTask });
  TasksLogger.write(`Task: ${taskCreated.id} has been created `);

  return taskCreated;
};
export const getTaskById = async (id: string): Promise<Task | null> => {
  return await prisma.task.findFirst({ where: { id } });
};
export const getAllTasks = async (
  page: number,
  limit: number
): Promise<Task[]> => {

  //unique name for each pagination page.
  const cacheKey = `allTasks-page-${page}-size-${limit}`; 
  const skip = (page - 1) * limit;

  // Check if data is already in the cache
  const cachedTasks = cache.get<Task[]>(cacheKey);
  if (cachedTasks) {
    TasksLogger.write("Returning tasks from cache");
    return cachedTasks;
  }

  // If not in cache, fetch from the database
  const tasks = await prisma.task.findMany({
    skip,
    take: limit,
    orderBy: {
      created_at: "desc", // Order tasks by creation date, for example
    },
  });

  // Store the result in cache
  cache.set(cacheKey, tasks);
  TasksLogger.write("fetched tasks");

  return tasks;
};
