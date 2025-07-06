import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

//Wherever we use protectRoute it ensures that user is authenticated
router.get("/users", protectRoute, getUsersForSidebar);
//: before id signifies that id is not a fixed value but a dynamic value
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
export default router;
