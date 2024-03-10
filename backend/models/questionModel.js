import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question cannot be empty"],
      maxlength: [60, "Question cannot be longer than 60 characters"],
    },
    options: [
      {
        type: String,
        required: [true, "Question must have an option"],
      },
    ],
    correctOption: {
      type: Number,
      validate: {
        validator: function (val) {
          return val <= this.options.length && val >= 1;
        },
        message: "Provided correct option is out of range of given options",
      },
    },
    timeToAnswer: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
