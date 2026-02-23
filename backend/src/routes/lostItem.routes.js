import express from "express";
import { createLostItem } from "../controllers/lostItem.controller.js";
import upload from "../middleware/upload.middleware.js";
import { getLostItems } from "../controllers/lostItem.controller.js";
import { getMyFoundPosts } from "../controllers/lostItem.controller.js";
const router = express.Router();

router.post("/create", upload.single("image"), createLostItem);
router.get("/lost", getLostItems);

router.get("/my-found/:userId", getMyFoundPosts);
export default router;
