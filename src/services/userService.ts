import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as userRepository from "../repositories/userRepository.js";
import JWT_SECRET from "../config/auth.json";

export const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, hashedPassword);
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET.secret,
    {
      expiresIn: 86400,
    }
  );

  return { user, token };
};
