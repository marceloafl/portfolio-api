import mongoose from "mongoose";
import { mongoURI } from "./app.js";

export async function main(): Promise<void> {
  if (!mongoURI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    return;
  }
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected"))
    .catch((error: Error) =>
      console.log(`Failed to connect to MongoDB: ${error}`)
    );
}
