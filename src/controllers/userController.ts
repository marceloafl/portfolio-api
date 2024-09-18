import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as userService from "../services/userService.js";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
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
    const user = await userService.getUserById(id);
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

  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
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
    const user = await userService.deleteUser(id);
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

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  await body("name").optional().isString().run(req);
  await body("email").optional().isEmail().run(req);
  await body("githubUrl").optional().isURL().run(req);
  await body("linkedinUrl").optional().isURL().run(req);
  await body("title").optional().isString().run(req);
  await body("subtitle").optional().isString().run(req);
  await body("projects").optional().isArray().run(req);
  await body("skills").optional().isArray().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const id = req.params.id;

  try {
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updateData = {
      name: req.body.name || existingUser.name,
      email: req.body.email || existingUser.email,
      githubUrl: req.body.githubUrl || existingUser.githubUrl,
      linkedinUrl: req.body.linkedinUrl || existingUser.linkedinUrl,
      title: req.body.title || existingUser.title,
      subtitle: req.body.subtitle || existingUser.subtitle,
      projects: req.body.projects || existingUser.projects,
      skills: req.body.skills || existingUser.skills,
    };

    const updatedUser = await userService.updateUser(id, updateData);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
