import express from "express";
const router = express.Router();

import { login, signup } from "../controllers/authController.js";

router.route("/").get(login).post(signup);

export default router;
