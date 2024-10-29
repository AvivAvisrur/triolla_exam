import { ReceivedTask } from "../controllers/task.controller";

import NodeCache from "node-cache";
import prisma from "../../prisma/prismaClient";
import { TasksLogger } from "../app";

export type Task = ReceivedTask & {
  priority: number;
  created_at?: Date;
};

export type FilterType = {
  priority?: string;
  title?: string;
  created_at?: Date;
  description?: string;
  sortBy?: "priority" | "created_at";
  order?: "asc" | "desc";
};

type PriorityRange = {
  min: number;
  max: number;
};

export type UpdateTask = {
  title?: string;
  description?: string;
  priority?: number;
};
const PriorityRanges: { [key: string]: PriorityRange } = {
  HIGH: { min: 0.7, max: 1 }, // Example: 0.7 - 1 is considered HIGH
  MID: { min: 0.4, max: 0.69 }, // 0.4 - 0.69 is MID
  LOW: { min: 0, max: 0.39 }, // 0 - 0.39 is LOW
};
const cache = new NodeCache({ stdTTL: 5 }); // Cache expires after 60 seconds

export const addTask = async (task: Task): Promise<Task & { id?: string }> => {
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
  limit: number,
  filters: FilterType
): Promise<{
  tasks: Task[];
  page: number;
  totalCount: number;
  totalPages: number;
}> => {
  //unique name for each pagination page.
  const cacheKey = `allTasks-page-${page}-size-${limit}`;
  const skip = (page-1) * limit;

  let priorityRange = undefined;

  // Map the priority level to a range if provided
  if (filters.priority) {
    priorityRange = PriorityRanges[filters.priority];
  }

  //check if sort is exists

  const sortBy = filters.sortBy || "created_at";
  const sortOrder = filters.order || "asc";

  // Check if data is already in the cache
  const cachedData = cache.get<{
    tasks: Task[];
    totalCount: number;
    page: number;
    totalPages: number;
  }>(cacheKey);

  if (cachedData) {
    TasksLogger.write("Returning tasks from cache");
    return {
      tasks: cachedData.tasks,
      page,
      totalCount: cachedData.totalCount,
      totalPages: cachedData.totalPages,
    };
  }

  const totalCount = await prisma.task.count({
    where: {
      priority: priorityRange
        ? {
            gte: priorityRange.min,
            lte: priorityRange.max,
          }
        : undefined,
      title: filters.title
        ? { contains: filters.title, mode: "insensitive" }
        : undefined,
      description: filters.description
        ? { contains: filters.description, mode: "insensitive" }
        : undefined,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);
  // If not in cache, fetch from the database
  const tasks = await prisma.task.findMany({
    skip,
    take: limit,
    where: {
      priority: priorityRange
        ? {
            gte: priorityRange.min,
            lte: priorityRange.max,
          }
        : undefined,
      title: filters.title
        ? { contains: filters.title, mode: "insensitive" }
        : undefined,
      description: filters.description
        ? { contains: filters.description, mode: "insensitive" }
        : undefined,
    },
    orderBy: {
      [sortBy]: sortOrder, // Order tasks by creation date, for example
    },
  });

  // Store the result in cache
  cache.set(cacheKey, { tasks, totalCount, totalPages });
  TasksLogger.write("fetched tasks");

  return {
    tasks,
    page,
    totalCount,
    totalPages,
  };
};

export const updateTask = async ({
  id,
  title,
  description,
  priority,
}: UpdateTask & { id?: string }): Promise<UpdateTask | null> => {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      priority,
    },
  });
};
