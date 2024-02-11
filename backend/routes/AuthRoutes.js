import express from "express";
import {
  register,
  verifyEmail,
  deleteAccount,
  editAccount,
  forgotPasswordHandle,
  resetPassword,
  login,
} from "../controllers/AuthControllers.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.delete("/delete/:userID", deleteAccount);
router.post("/edit/:userID", upload.single("file"), editAccount);
router.post("/forgot-password", forgotPasswordHandle);
router.post("/reset-password/:userID", resetPassword);

router.get("/verify/:userID/:token", verifyEmail);

export default router;
