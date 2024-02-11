import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const tokenSchema = new mongoose.Schema(
  {
    token: {
        type: String
    }
  }
);

tokenSchema.index({ token: 1 }, { expireAfterSeconds: 300 })


export default mongoose.model("Token", tokenSchema);
