import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { loginUser, registerUser } from "../services/userService.js";
import { UserDTO } from "../dtos/UserDTO.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  await body("email").isEmail().notEmpty().run(req);
  await body("password").isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const newUser = await registerUser(email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  await body("email").isEmail().notEmpty().run(req);
  await body("password").isLength({ min: 6 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    const userDTO: UserDTO = {
      id: user._id.toString(),
      email: user.email,
    };
    res.status(200).json({ message: "Login successful", user: userDTO, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: error });
  }
};
