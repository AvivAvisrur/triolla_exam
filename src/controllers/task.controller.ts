import { NextFunction, Request, Response } from "express";
import { addTask, getAllTasks, getTaskById } from "../services/task.service";
import { priorityCalculate } from "../utils/helperFunctions";

export type ReceivedTask = {
  title: string;
  description: string;
  date?: Date;
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

  return await getAllTasks(page, limit);
};

export const findTaskById = async (req: Request, res: Response) => {
  return await getTaskById(req.params.id);
};
