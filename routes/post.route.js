import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  featurePost,
} from "../controllers/post.js";
import increaseVisit from "../middlewares/increaseVisit.js";
import { authMiddleWare } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", authMiddleWare, createPost);
router.delete("/:id", authMiddleWare, deletePost);
router.patch("/feature", featurePost);

export default router;
