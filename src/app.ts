import mongoose from "mongoose";
import profileRouter from "./routes/profileRoutes.js";
import authRouter from "./routes/authRoutes.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { main } from "./config/db.js";
import swaggerDocs from "./swagger.json";
import { PORT } from "./config/app.js";

const app = express();
const port = PORT;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/v1", authRouter);
app.use("/v1", profileRouter);

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

export default app;
