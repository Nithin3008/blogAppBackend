import express from "express";
import {
  getUserSavedPosts,
  loginUser,
  savePost,
  signUp,
} from "../controllers/user.js";
import { authMiddleWare } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signUp);
router.get("/saved", authMiddleWare, getUserSavedPosts);
router.patch("/save", authMiddleWare, savePost);

export default router;
