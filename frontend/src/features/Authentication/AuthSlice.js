import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  userID: "",
  name: "",
  email: "",
  avatarLink: "",
  status: "",
  errors: {
    name: "",
    email: "",
    password: "",
    image: "",
  },
  message: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.message = "";
      (state.errors = {
        name: "",
        email: "",
        password: "",
        image: "",
      }),
        (state.status = "loading");
    },
    [registerUser.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "success";
      state.message = action.payload.message;
    },
    [registerUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = "failed";
      state.errors = action.payload.errors;
    },
  },
});

export default authSlice.reducer;
