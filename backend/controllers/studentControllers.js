import studentModel from "../models/studentModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";

// @desc Register a student
// POST /api/student/register
// PUBLIC
export const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const student = await studentModel.findOne({ email });

  if (student) {
    throw new Error("User with this email already ");
  } else {
    const newStudent = await studentModel.create({
      imgUrl: "",
      name,
      email,
      password,
    });
    newStudent.save();

    res.status(201).json({
      message: "New student registered",
      id: newStudent._id,
      name: newStudent.name,
    });
  }
});

// @desc Login a student
// POST /api/student/login
// PUBLIC
export const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await studentModel.findOne({ email });

  if (student && (await student.matchPasswords(password))) {
    generateToken(res, student._id);
    res.json({
      id: student._id,
      name: student.name,
      email: student.email,
    });
  } else {
    throw new Error("Invalid email or password");
  }
});

// @desc Delete a student
// DELETE /api/student/delete/:id
// PRIVATE
export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const student = await studentModel.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully", student });
  } catch (err) {
    console.log(err);
    throw new Error("Student couldn't be deleted");
  }
});

// @desc Update a student
// PUT /api/student/update/:id
// PRIVATE
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const student = await studentModel.findById(id);
  name ? (student.name = name) : (student.name = student.name);
  email ? (student.email = email) : (student.email = student.email);
  password
    ? (student.password = password)
    : (student.password = student.password);

  student.save();
  res.status(200).json({ message: "Student update successfully", student });
});
