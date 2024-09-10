import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import express from "express";
import { main } from "./config/db.js";

const app = express();
const port = 8081;

app.use(express.json());

app.use("/users", userRouter);

async function startServer() {
  try {
    await main().catch((err) => console.log(err));
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}
startServer();
