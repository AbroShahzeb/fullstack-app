import fs from "fs";

import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", name: "", image: "" };

  if (err.message === "duplication error") {
    errors.email = "The user with this email already exists";
  }

  if (err.message === "image error") {
    errors.image = "A problem occured while uploading image";
  }

  if (err.code === 11000) {
    errors.email = "User with this email exists";
  }

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });
}

import UserModel from "../models/UserModel.js";
import TokenModel from "../models/TokenModel.js";

import supabase from "../utils/supabase.js";
import { sendMail } from "../utils/mail.js";

export const register = async (req, res) => {
  const { mimetype, originalname, path } = req.file;
  const { name, email, password } = req.body;
  const imgUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/profile_images/${originalname}`;

  const err = {
    message: "",
  };

  // const user = await UserModel.findOne({ email });

  // if (user) {
  //   err.message = "duplication error";
  //   const errors = handleErrors(err);
  //   res.status(400).json({ errors });
  // } else {
  const readStream = fs.createReadStream(path);

  const { error } = await supabase.storage
    .from("profile_images")
    .upload(originalname, readStream, {
      contentType: mimetype,
      duplex: "half",
      upsert: false,
    });

  // Delete the file from local upload folder
  // fs.unlink(path, (err, data) => {
  //   if (err) console.log("An error occured while deleting file locally");
  // });

  if (error) {
    err.message = "image error";
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  } else {
    try {
      const newUser = await UserModel.create({
        name,
        avatarLink: imgUrl,
        email,
        password,
        role: "user",
      });

      const token = await TokenModel.create({ token: randomUUID() });

      sendMail(
        email,
        "Verify your email",
        `<p>Click on the below given link to verify your email.</p>
              <a href=\'http://localhost:5000/user/verify/${newUser.id}/${token.token}\' >Click here</a>
          `
      );

      res.status(201).json({
        message:
          "Signup successful. Please check your email to verify your account.",
      });
    } catch (error) {
      const errors = handleErrors(error);

      res.status(400).json({ errors });
    }
  }
};
// };

export const deleteAccount = async (req, res) => {
  const { userID } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userID);
    const imgName = deletedUser?.avatarLink.replace(
      "https://agsvtyynbmewsbnhtbrs.supabase.co/storage/v1/object/public/profile_images/",
      ""
    );

    // delete the avatar image
    const { data, error } = await supabase.storage
      .from("profile_images")
      .remove([imgName]);

    if (deletedUser) console.log("Delete the user:", deletedUser);
    else {
      console.log("User with this id doesn't exist");
      throw new Error(`No such user with id ${userID} exists`);
    }
    res.json(`User ${deletedUser.name} deleted successfully`);
  } catch (err) {
    console.log(err);

    res.json("User couldn't be deleted");
  }
};

export const editAccount = async (req, res) => {
  const { userID } = req.params;
  const { mimetype, originalname, path } = req.file;
  const { name, password } = req.body;

  try {
    const user = await UserModel.findById(userID);
    const imgName = user?.avatarLink.replace(
      "https://agsvtyynbmewsbnhtbrs.supabase.co/storage/v1/object/public/profile_images/",
      ""
    );

    if (!user) {
      res.json("No such user exists");
      throw new Error("No such user exists");
    }

    let imgPath = `https://agsvtyynbmewsbnhtbrs.supabase.co/storage/v1/object/public/profile_images/${originalname}`;

    const { error: imgDeletionError } = await supabase.storage
      .from("profile_images")
      .remove([imgName]);

    if (imgDeletionError) {
      console.log("Couln't delete the profile image for renewal");
      throw new Error("Error editing in user details");
    }

    const imgStream = fs.createReadStream(path);

    const { error: imgUploadingError } = await supabase.storage
      .from("profile_images")
      .upload(originalname, imgStream, {
        contentType: mimetype,
        duplex: "half",
        upsert: true,
      });

    if (imgUploadingError) {
      console.log("Couln't upload the new profile picture");
      throw new Error(
        "Error editing user (couldn't upload new profile picture)"
      );
    }

    user.name = name;
    user.avatarLink = imgPath;
    user.password = password;

    user.save();

    // Delete the file from local upload folder
    fs.unlink(path, (err, data) => {
      if (err) console.log("An error occured while deleting file locally");
    });

    res.json("User details edited successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Couldn't edit the user details. Try again later");
  }
};

export const verifyEmail = async (req, res) => {
  const { userID, token } = req.params;

  const user = await UserModel.findById(userID);

  if (!user) {
    throw new Error("No such user exists");
  }

  user.isEmailVerified = true;
  user.save();

  res.json({ message: "Congratulations! Your email is verified now" });
};

export const forgotPasswordHandle = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(404).json("No user with such email exists");
  }
  console.log("User", user);
  console.log("User ID", user._id);
  sendMail(
    email,
    "Reset your password",
    `
        <p>Click on the link below to reset your password</p>
        <a href=\`http://localhost:5000/user/reset-password/${user.id}\`>Reset your password</a>
    `
  );

  res.json({ message: "Check your email to reset your password" });
};

export const resetPassword = async (req, res) => {
  const { userID } = req.params;
  const { password } = req.body;

  try {
    const user = await UserModel.findById(userID);

    user.password = password;
    user.save();
    res.json({
      message: "Password reset successfully, login to your account now",
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Couldn't reset the password" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.login(email, password);

  if (user) {
    const token = generateToken(user);
    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ message: "Logged in successfully", jwtCookie: token });
  } else {
    res.status(404).json({ message: "Invalid credentials" });
  }
};
