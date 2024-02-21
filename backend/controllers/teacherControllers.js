import teacherModel from "../models/teacherModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";

// @desc Register a Teacher
// POST /api/teacher/register
// PUBLIC
export const registerTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const teacher = await teacherModel.findOne({ email });

  if (teacher) {
    throw new Error("Teacher with this email already ");
  } else {
    const newTeacher = await teacherModel.create({
      imgUrl: "",
      name,
      email,
      password,
    });
    newTeacher.save();

    res.status(201).json({
      message: "New Teacher registered",
      id: newTeacher._id,
      name: newTeacher.name,
    });
  }
});

// @desc Login a Teacher
// POST /api/teacher/login
// PUBLIC
export const loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await teacherModel.findOne({ email });

  if (teacher && (await teacher.matchPasswords(password))) {
    generateToken(res, teacher._id);
    res.json({
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
    });
  } else {
    throw new Error("Invalid email or password");
  }
});

// @desc Delete a Teacher
// DELETE /api/teacher/delete/:id
// PRIVATE
export const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await teacherModel.findByIdAndDelete(id);
    res.json({ message: "Teacher deleted successfully", teacher });
  } catch (err) {
    console.log(err);
    throw new Error("Teacher couldn't be deleted");
  }
});

// @desc Update a Teacher
// PUT /api/teacher/update/:id
// PRIVATE
export const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const teacher = await teacherModel.findById(id);
  name ? (teacher.name = name) : (teacher.name = teacher.name);
  email ? (teacher.email = email) : (teacher.email = teacher.email);
  password
    ? (teacher.password = password)
    : (teacher.password = teacher.password);

  teacher.save();
  res.status(200).json({ message: "Teacher update successfully", teacher });
});
