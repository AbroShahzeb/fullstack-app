import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB successfully!");
    })
    .catch((err) => {
      console.log("DB Error", err);
    });
}

export default connectDB;
