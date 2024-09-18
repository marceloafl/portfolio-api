import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as profileService from "../services/profileService.js";

export const getAllProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfileById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const profile = await profileService.getProfileById(id);
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  await body("name").isString().notEmpty().run(req);
  await body("email").isEmail().notEmpty().run(req);
  await body("password").isString().notEmpty().run(req);
  await body("contactEmail").isEmail().notEmpty().run(req);
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
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const profile = await profileService.deleteProfile(id);
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  await body("name").optional().isString().run(req);
  await body("email").optional().isEmail().run(req);
  await body("password").optional().isString().run(req);
  await body("contactEmail").optional().isEmail().run(req);
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
    const existingProfile = await profileService.getProfileById(id);
    if (!existingProfile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    const updateData = {
      name: req.body.name || existingProfile.name,
      email: req.body.email || existingProfile.email,
      password: req.body.password || existingProfile.password,
      contactEmail: req.body.contactEmail || existingProfile.contactEmail,
      githubUrl: req.body.githubUrl || existingProfile.githubUrl,
      linkedinUrl: req.body.linkedinUrl || existingProfile.linkedinUrl,
      title: req.body.title || existingProfile.title,
      subtitle: req.body.subtitle || existingProfile.subtitle,
      projects: req.body.projects || existingProfile.projects,
      skills: req.body.skills || existingProfile.skills,
    };

    const updatedProfile = await profileService.updateProfile(id, updateData);
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
