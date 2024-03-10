import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A quiz must have a title"],
      maxlength: [50, "Quiz title cannot be greater than 50 characters"],
      minlength: [3, "Quiz title cannot be less than 3 characters"],
    },
    description: {
      type: String,
      maxlength: [
        250,
        "Quiz description cannot be greater than 250 characters",
      ],
    },
    questions: [{ type: mongoose.Schema.ObjectId, ref: "Question" }],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Teacher",
    },
    currentlyBeingTakenBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
      },
    ],
    joiningCode: {
      type: String,
    },
    difficultyLevel: {
      type: String,
      enum: ["Not defined", "Easy", "Medium", "Hard"],
      default: "Not defined",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

quizSchema.pre(/^find/, function (next) {
  this.populate("questions");
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
