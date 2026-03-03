import LostItem from "../models/lostItem.model.js";
import { processMatching } from "../services/aiMatching.service.js";
import { generateTextEmbedding } from "../services/embedding.service.js";
import { generateImageEmbedding } from "../services/imageMatching.service.js";
// export const createLostItem = async (req, res) => {
//   try {
//     const lostItem = await LostItem.create(req.body);
//     res.status(201).json(lostItem);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const createLostItem = async (req, res) => {
  try {
    console.log("==== REQUEST RECEIVED ====");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    // const newLostItem = new LostItem({
    //   ...req.body,
    //   image: req.file ? req.file.filename : null,
    // });
    const newLostItem = new LostItem({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      address: req.body.address,
      pincode: req.body.pincode,
      userId: req.body.userId,
      type: req.body.type, // IMPORTANT
      image: req.file ? req.file.filename : null,
      coordinates: {
        lat: req.body.lat ? Number(req.body.lat) : null,
        lng: req.body.lng ? Number(req.body.lng) : null,
      },
    });

    await newLostItem.save();
    // 1️⃣ Generate text embedding
    const textEmbedding = await generateTextEmbedding(
      `${newLostItem.title} ${newLostItem.description} ${newLostItem.category}`,
    );

    newLostItem.embedding = textEmbedding;

    // 2️⃣ Generate image embedding (if image exists)
    if (newLostItem.image) {
      const imageEmbedding = await generateImageEmbedding(newLostItem.image);
      newLostItem.imageEmbedding = imageEmbedding;
    }

    // Save again with embeddings
    await newLostItem.save();

    // 3️⃣ Run matching
    await processMatching(newLostItem);
    res.status(201).json(newLostItem);
  } catch (error) {
    console.log("==== ERROR OCCURRED ====");
    console.log(error); // THIS IS IMPORTANT

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const getLostItems = async (req, res) => {
  try {
    const { category, date } = req.query;

    let filter = { type: "lost" };

    // Category filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // Date filter
    if (date && date !== "All") {
      const now = new Date();
      let startDate;

      if (date === "Today") {
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
      }

      if (date === "This Week") {
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
      }

      if (date === "This Month") {
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
      }

      if (startDate) {
        filter.createdAt = { $gte: startDate };
      }
    }

    const lostItems = await LostItem.find(filter).sort({ createdAt: -1 });

    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getMyFoundPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await LostItem.find({
      userId,
      type: "found",
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getFoundMatchesForOwner = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Get all lost posts of this owner
    const lostPosts = await LostItem.find({
      userId,
      type: "lost",
    });

    if (!lostPosts.length) {
      return res.json([]);
    }

    // 2️⃣ Extract categories from lost posts
    const categories = lostPosts.map((item) => item.category);

    // 3️⃣ Find matching found items
    const foundMatches = await LostItem.find({
      type: "found",
      category: { $in: categories },
      status: "active",
    }).sort({ createdAt: -1 });

    res.json(foundMatches);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getMyLostPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await LostItem.find({
      userId,
      type: "lost",
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getItemMatches = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await LostItem.findById(itemId).populate("matches.itemId");

    res.json(item.matches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
