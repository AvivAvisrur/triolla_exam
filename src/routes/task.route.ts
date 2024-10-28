import { NextFunction, Request, Response, Router } from "express";
import {
  createTask,
  findTaskById,
  getTasks,
} from "../controllers/task.controller";
import { asyncRouteWrapper } from "../utils/asyncRouterWrapper";

const router = Router();

router.post("/", asyncRouteWrapper(createTask));
router.get("/:id", asyncRouteWrapper(findTaskById));
router.get("/", asyncRouteWrapper(getTasks));

export default router;
