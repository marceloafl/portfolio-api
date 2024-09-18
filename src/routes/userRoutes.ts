import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { validateId } from "../middleware/validation.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", validateId, getUserById);
router.post("/users", createUser);
router.delete("/users/:id", validateId, deleteUser);
router.put("/users/:id", validateId, updateUser);

export default router;
