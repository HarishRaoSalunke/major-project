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
    // status: {
    //   type: String,
    //   default: "searching",
    // },
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    embedding: {
      type: [Number], // text vector
    },

    imageEmbedding: {
      type: [Number], // image vector
    },

    coordinates: {
      lat: Number,
      lng: Number,
    },

    matches: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LostItem",
        },
        score: Number,
        breakdown: {
          textScore: Number,
          imageScore: Number,
          locationScore: Number,
          timeScore: Number,
        },
        matchedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("LostItem", lostItemSchema);
