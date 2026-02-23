import express from "express";
import { createLostItem } from "../controllers/lostItem.controller.js";
import upload from "../middleware/upload.middleware.js";
const router = express.Router();

router.post("/create", upload.single("image"), createLostItem);

export default router;
