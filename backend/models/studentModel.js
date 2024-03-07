import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name should be atleast 3 characters long"],
      maxlength: [35, "Name cannot be longer than 35 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Student with this email already exists"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      minlength: [8, "Password must be atleast 8 characters long"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirmation cannot be empty"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password don't match",
      },
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("Student", studentSchema);
export default student;
