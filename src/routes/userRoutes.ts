import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { validateId } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/users", getAllUser);
router.get("/users/:id", validateId, getUserById);
router.post("/users", createUser);
router.delete("/users/:id", validateId, deleteUser);
router.put("/users/:id", validateId, updateUser);

export default router;
