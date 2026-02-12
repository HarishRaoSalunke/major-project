import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/otp.js";

// MOBILE LOGIN – SEND OTP
export const loginWithMobile = async (req, res) => {
  const { mobile } = req.body;

  const user = await User.findOne({ mobile });
  if (!user) {
    return res.status(404).json({ code: "USER_NOT_FOUND" });
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  await user.save();

  console.log("LOGIN OTP:", otp); // replace with SMS later

  res.json({ message: "OTP sent" });
};

// USERID + PASSWORD LOGIN
export const loginWithPassword = async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(404).json({ code: "USER_NOT_FOUND" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ code: "INVALID_PASSWORD" });
  }

  res.json({ message: "Login success", user });
};

// REGISTER – SEND OTP
export const registerUser = async (req, res) => {
  const { fullName, mobile, email, userId, password, city, userType } =
    req.body;

  const existingUser = await User.findOne({
    $or: [{ mobile }, { userId }],
  });

  if (existingUser) {
    return res.status(400).json({ code: "USER_ALREADY_EXISTS" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  const user = new User({
    fullName,
    mobile,
    email,
    userId,
    password: hashedPassword,
    city,
    userType,
    otp,
    otpExpires: Date.now() + 5 * 60 * 1000,
  });

  await user.save();

  console.log("REGISTER OTP:", otp);

  res.json({ message: "OTP sent for registration" });
};
export const verifyRegisterOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await User.findOne({ mobile });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ code: "INVALID_OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: "Registration successful" });
};

export const sendRegisterOtp = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile || mobile.length !== 10) {
    return res.status(400).json({ message: "Invalid mobile number" });
  }

  let user = await User.findOne({ mobile });
  if (user && user.isVerified) {
    return res.status(400).json({ message: "User already registered" });
  }

  const otp = generateOTP();

  if (!user) {
    user = new User({ mobile });
  }

  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  await user.save();

  console.log("REGISTER OTP:", otp);

  res.json({ message: "OTP sent" });
};
export const verifyRegisterOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await User.findOne({ mobile });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.otp = null;
  user.otpExpires = null;
  user.isVerified = true;
  await user.save();

  res.json({ message: "OTP verified successfully" });
};
export const checkUserId = async (req, res) => {
  const { userId } = req.body;

  const exists = await User.findOne({ userId });
  res.json({ available: !exists });
};
export const completeRegistration = async (req, res) => {
  const { mobile, fullName, email, userId, password, address, pincode } =
    req.body;

  const user = await User.findOne({ mobile });

  if (!user || !user.isVerified) {
    return res.status(400).json({ message: "OTP not verified" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.fullName = fullName;
  user.email = email;
  user.userId = userId;
  user.password = hashedPassword;
  user.address = address;
  user.pincode = pincode;

  await user.save();

  res.json({ message: "Registration completed" });
};
