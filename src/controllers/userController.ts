import { Request, Response } from "express";
import User from "../models/userModel.js";
import { body, validationResult } from "express-validator";

export const getAllUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  await body("name").isString().notEmpty().run(req);
  await body("email").isEmail().notEmpty().run(req);
  await body("githubUrl").isURL().notEmpty().run(req);
  await body("linkedinUrl").isURL().notEmpty().run(req);
  await body("title").isString().notEmpty().run(req);
  await body("subtitle").isString().notEmpty().run(req);
  await body("projects").isArray().notEmpty().run(req);
  await body("skills").isArray().notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const {
    name,
    email,
    githubUrl,
    linkedinUrl,
    title,
    subtitle,
    projects,
    skills,
  } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      githubUrl,
      linkedinUrl,
      title,
      subtitle,
      projects,
      skills,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
