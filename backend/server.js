import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import AuthRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthRoutes);
app.use(cookieParser());

app.use("/", (req, res) => {
  res.json("Hello from server");
});

app.listen(port, () => console.log(`Server started on port ${port}`));

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     console.log("Some changes :)");
//     res.send("API is running....");
//   });
// }
