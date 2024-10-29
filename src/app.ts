import express, { Request, Response } from "express";
import "dotenv/config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import combineRoutes from "./routes/combineRoutes.route";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";
const app = express();
export const TasksLogger = fs.createWriteStream(
  path.join(__dirname, "tasks.log"),
  {
    flags: "a",
  }
);

//global middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("short", { stream: TasksLogger }));

//routes

app.use("/api", combineRoutes);
//Generic error handling
app.use(errorHandler);
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
