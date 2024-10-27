import { NextFunction, Request, Response, Router } from "express";
import { createTask, findTaskById } from "../controllers/task.controller";
import { asyncRouteWrapper } from "../utils/asyncRouterWrapper";
import { getAllTasks } from "../services/task.service";

const router = Router();

router.get("/:id", asyncRouteWrapper(findTaskById));
router.post("/", asyncRouteWrapper(createTask));

router.get("/", asyncRouteWrapper(getAllTasks));

export default router;
