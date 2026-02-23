import LostItem from "../models/lostItem.model.js";

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
      image: req.file ? req.file.filename : null,
    });

    await newLostItem.save();

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
