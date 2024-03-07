import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./backend/utils/db.js";

import app from "./backend/app.js";

connectDB();

app.listen(process.env.PORT, () => console.log("Server is running..."));
