import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});
const User = mongoose.model<IUser>("User", userSchema);
export default User;
