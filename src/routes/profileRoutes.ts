import express from "express";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profileController.js";
import { validateId } from "../middleware/validation.js";

const router = express.Router();

router.get("/profiles", getAllProfiles);
router.get("/profiles/:id", validateId, getProfileById);
router.post("/profiles", createProfile);
router.delete("/profiles/:id", validateId, deleteProfile);
router.put("/profiles/:id", validateId, updateProfile);

export default router;
