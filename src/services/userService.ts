import { IUser } from "../models/userModel.js";
import * as userRepository from "../repositories/userRepository.js";

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: string) => {
  return await userRepository.getUserById(id);
};

export const createUser = async (userData: IUser) => {
  return await userRepository.createUser(userData);
};

export const deleteUser = async (id: string) => {
  return await userRepository.deleteUser(id);
};

export const updateUser = async (id: string, updateData: IUser) => {
  return await userRepository.updateUser(id, updateData);
};
