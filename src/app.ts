import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.SERVER_PORT}`
  );
});
