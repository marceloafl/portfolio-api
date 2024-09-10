import { Request, Response } from "express";
import User from "../models/userModel.js";

export const getAllUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {}
};
