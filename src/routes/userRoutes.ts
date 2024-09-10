import express from "express";
import { getAllUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);

// router.get("/", (req, res) => {
//   res.send("Alou alou");
// });

export default router;
