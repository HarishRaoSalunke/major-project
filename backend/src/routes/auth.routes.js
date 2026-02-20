// // import express from "express";
// // import {
// //   loginWithMobile,
// //   loginWithPassword,
// // } from "../controllers/auth.controller.js";

// // const router = express.Router();

// // router.post("/login/mobile", loginWithMobile);
// // router.post("/login/password", loginWithPassword);

// // export default router;
// import express from "express";
// import {
//   registerUser,
//   verifyRegisterOTP,
//   loginWithMobile,
//   loginWithPassword,
//   sendRegisterOtp,
//   verifyRegisterOtp,
//   checkUserId,
//   completeRegistration,
// } from "../controllers/auth.controller.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/register/verify-otp", verifyRegisterOTP);

// router.post("/login/mobile", loginWithMobile);
// router.post("/login/password", loginWithPassword);
// router.post("/register/send-otp", sendRegisterOtp);
// router.post("/register/verify-otp", verifyRegisterOtp);
// router.post("/register/check-userid", checkUserId);
// router.post("/register/complete", completeRegistration);

// export default router;
import express from "express";
import {
  sendRegisterOtp,
  verifyRegisterOtp,
  completeRegistration,
  loginWithMobile,
  loginWithPassword,
  checkUserId,
  updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Registration Flow
router.post("/register/send-otp", sendRegisterOtp);
router.post("/register/verify-otp", verifyRegisterOtp);
router.post("/register/complete", completeRegistration);
router.post("/register/check-userid", checkUserId);

// Login
router.post("/login/mobile", loginWithMobile);
router.post("/login/password", loginWithPassword);
router.put("/profile/update", updateProfile);
export default router;
