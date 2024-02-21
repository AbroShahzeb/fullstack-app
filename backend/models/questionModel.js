import mongoose from "mongoose";

const questionSchema = await mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctOption: {
      type: String,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    timeToAnswer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model("Question", questionSchema);
export default questionModel;
