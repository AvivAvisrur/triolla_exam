import express, { Request, Response } from "express";
import "dotenv/config";
import prisma from "../prisma/prismaClient";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import combineRoutes from "./routes/combineRoutes.route";
const app = express();

//global middlewares
app.use(express.json());

//routes

app.use("/api", combineRoutes);
//Generic error handling
app.use(errorHandler);
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
