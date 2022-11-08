import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue}) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        user,
        config
      );
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        user,
        config
      );
      const data = {
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
        id: res.data.user._id,
        token: res.data.token,
      };
      localStorage.setItem("userInfo", JSON.stringify(data));
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// export const userLogout = createAsyncThunk(
//   "users/logout",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/users/logout")
//       localStorage.removeItem("userInfo")
//       return res.data
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

const userLoggedIn = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialError = {
  open: false,
  message: "",
  type: "success",
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: initialError,
    user: userLoggedIn,
    registered: false,
    isLoggedIn: false
  },
  reducers: {
    removeAlert(state, action) {
      state.error = initialError;
    },
  },
  extraReducers: {
    [userRegister.pending]: (state, action) => {
      state.loading = true;
      // state.error = initialError;
      // state.registered = false
    },
    [userRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.registered = true
    },
    [userRegister.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "error";
    },
    [userLogin.pending]: (state, action) => {
      state.loading = true;
      state.error = initialError;
      // state.user = null;
      // state.isLoggedIn = false
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.isLoggedIn = true
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "error";
    },
    // [userLogout.pending]: (state, action) => {
    //   state.loading = true;
    //   state.error = initialError;
    // },
    // [userLogout.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.user = null;
    //   state.error.open = true;
    //   state.error.message = action?.payload?.message;
    //   state.isLoggedIn = false
    // },
    // [userLogout.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error.open = true;
    //   state.error.message = action?.payload?.message;
    //   state.error.type = "error";
    // },
  },
});

export const userActionns = userSlice.actions;

export default userSlice.reducer;
