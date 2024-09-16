import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
} from "../controllers/userController.js";
import { validateId } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/users", getAllUser);
router.get("/users/:id", validateId, getUserById);
router.post("/users", createUser);
router.delete("/users/:id", validateId, deleteUser);

export default router;
