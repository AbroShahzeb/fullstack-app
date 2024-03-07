import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
    role: {
      type: String,
      default: "student",
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      minlength: [8, "Password must be atleast 8 characters long"],
      select: false,
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
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

  next();
});

studentSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

studentSchema.methods.arePasswordsEqual = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < passwordChangeTime;
  }
  return false;
};

const student = mongoose.model("Student", studentSchema);
export default student;
