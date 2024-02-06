import { register } from "../controllers/AuthControllers.js";

import express from "express";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);

export default AuthRoutes;
