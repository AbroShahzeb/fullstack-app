import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { connectDB } from "./backend/utils/db.js";

import app from "./backend/app.js";

let server;
connectDB().then(() => {
  server = app.listen(process.env.PORT, () =>
    console.log("Server is running...")
  );
});

export const socket = new Server(server, {
  cors: "*",
});

socket.on("connection", () => console.log("Someone connected"));
