import { NextFunction, Request, Response } from "express";
import { addTask, getAllTasks, getTaskById } from "../services/task.service";
import { descriptionPriority } from "../utils/helperFunctions";

export type CreateTask = {
  title: string;
  description: string;
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description }: CreateTask = req.body;

  const priority = descriptionPriority({ description, title });

  return await addTask({ title, description, priority });
};

export const getTasks = async (req: Request, res: Response) => {
  return await getAllTasks();
};

export const findTaskById = async (req: Request, res: Response) => {
  return await getTaskById(req.params.id);
};
