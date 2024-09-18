import User from "../models/userModel.js";

export const createUser = async (email: string, hashedPassword: string) => {
  const newUser = new User({ email, password: hashedPassword });
  return await newUser.save();
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select("+password");
};
