import User from "../models/user.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { sign } = pkg;

const jwtSecret = process.env.JWT_SECRET;
export const signUp = async (req, res) => {
  let newUserDetails;
  if (req.body) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    newUserDetails = { ...req.body, password: hashPassword };
  } else {
    res.status(404).json("Cannot signup user");
  }
  const newUser = new User(newUserDetails);
  await newUser.save();
  const token = sign({ id: newUser._id }, jwtSecret);
  res.status(200).json({ message: "User Created", token, user: newUser });
};

export const loginUser = async (req, res) => {
  const findUser = await User.findOne({
    email: req.body.email,
  });
  if (findUser) {
    const token = sign({ id: findUser._id }, jwtSecret);
    res.status(200).json({ token, user: findUser });
  } else {
    res.status(404).json({ message: "cannot find user" });
  }
};

export const getUserSavedPosts = async (req, res) => {
  const userId = res.locals.userId;
  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ _id: userId });
  console.log(user, "saveed posts");

  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const userId = res.locals.userId;
  const postId = req.body.postId;

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ _id: userId });

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};
