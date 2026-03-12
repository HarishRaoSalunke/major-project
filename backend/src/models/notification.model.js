import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    message: String,

    type: {
      type: String,
      enum: ["match", "system"],
      default: "match",
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LostItem",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
