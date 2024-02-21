import mongoose from "mongoose";
import questionModel from "./questionModel.js";

const quizSchema = await mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title of quiz is required"],
    },
    description: {
      type: String,
      required: [true, "Description of quiz is required"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

quizSchema.pre("findOneAndDelete", async function (next) {
  const quizId = this.getFilter()._id;
  await questionModel.deleteMany({ quizId });
  next();
});

const quizModel = mongoose.model("Quiz", quizSchema);
export default quizModel;
