import express from "express";
import Notification from "../models/notification.model.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const notifications = await Notification.find({
    userId: req.params.userId,
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

export default router;
