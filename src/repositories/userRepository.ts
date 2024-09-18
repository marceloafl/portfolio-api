import User, { IUser } from "../models/userModel.js";

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async (userData: IUser) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const updateUser = async (id: string, updateData: IUser) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};
