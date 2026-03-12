import LostItem from "../models/lostItem.model.js";

export const getTransactionDetails = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await LostItem.findById(itemId)
      .populate("userId", "name mobile")
      .populate("matchedUserId", "name mobile");

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const startReturnProcess = async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await LostItem.findById(itemId);

    item.returnStatus = "in_progress";

    await item.save();

    res.json({ message: "Return process started" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const confirmReturn = async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await LostItem.findById(itemId);

    item.returnStatus = "returned";
    item.status = "returned";
    item.returnedAt = new Date();

    await item.save();

    res.json({ message: "Item returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
