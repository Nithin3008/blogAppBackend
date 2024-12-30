import express from "express";
import {
  addComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.js";
import { authMiddleWare } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/:postId", authMiddleWare, addComment);
router.delete("/:id", authMiddleWare, deleteComment);

export default router;
