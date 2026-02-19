// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     fullName: { type: String },
//     mobile: { type: String, required: true, unique: true },
//     email: { type: String },
//     userId: { type: String, unique: true },
//     password: { type: String },
//     city: { type: String },
//     address: { type: String },
//     pincode: { type: String },
//     userType: { type: String, default: "user" },

//     otp: String,
//     otpExpires: Date,
//     isVerified: { type: Boolean, default: false },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    mobile: { type: String, required: true, unique: true },
    email: String,
    userId: { type: String, unique: true },
    password: String,
    address: String,
    pincode: String,
    city: String,
    userType: String,

    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
