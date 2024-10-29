import { NextFunction, Request, Response } from "express";
import {
  addTask,
  getAllTasks,
  getTaskById,
  Task,
  updateTask,
} from "../services/task.service";
import { priorityCalculate } from "../utils/helperFunctions";

export type ReceivedTask = {
  title: string;
  description: string;
  created_at?: Date;
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description }: ReceivedTask = req.body;

  //initialize task to calculate priority.
  const taskToCreate = priorityCalculate({
    description,
    title,
    priority: 0,
    //passing this new date just to demonstrate the created_at field for the priority calculation
    created_at: new Date(),
  });

  return await addTask(taskToCreate);
};

export const getTasks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const priorityFilter = req.query.priorityFilter as string;
  const titleFilter = req.query.titleFilter as string;
  const descriptionFilter = req.query.descriptionFilter as string;
  const sortByFilter = req.query.sortBy as "priority" | "created_at";
  const sortOrderFilter = req.query.order as "asc" | "desc";
  return await getAllTasks(page, limit, {
    priority: priorityFilter,
    title: titleFilter,
    description: descriptionFilter,
    sortBy: sortByFilter,
    order: sortOrderFilter,
  });
};

export const findTaskById = async (req: Request, res: Response) => {
  return await getTaskById(req.params.id);
};

export const updateTaskById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description }: ReceivedTask & { created_at?: Date } = req.body;

  let taskToUpdate = null;

  if (description) {
    taskToUpdate = priorityCalculate({
      id,
      description,
      title,
      priority: 0,
      //passing this new date just to demonstrate the created_at field for the priority calculation
    });
  } else {
    taskToUpdate = {
      id,
      title,
    };
  }

  return await updateTask(taskToUpdate);
};
