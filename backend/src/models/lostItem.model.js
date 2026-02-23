import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    description: { type: String, required: true },
    location: { type: String, required: true },
    address: String,
    pincode: String,
    image: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "searching",
    },
  },
  { timestamps: true },
);

export default mongoose.model("LostItem", lostItemSchema);
