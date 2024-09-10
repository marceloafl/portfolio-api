import mongoose from "mongoose";

export async function main(): Promise<void> {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/portfolio")
    .then(() => console.log("Connected"))
    .catch((error: Error) => console.log(error));

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
