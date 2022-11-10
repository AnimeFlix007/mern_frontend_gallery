import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImage = createAsyncThunk(
  "gallery/upload",
  async (image, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      };
      const res = await axios.post("https://animixgallerybackend.herokuapp.com/api/gallery/", image, config);
      console.log("ressss",res.data);
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "gallery/delete",
  async (imageId, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    };
    try {
      const res = await axios.delete(`https://animixgallerybackend.herokuapp.com/api/gallery/${imageId}`, config);
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllImages = createAsyncThunk(
  "gallery/getAllImages",
  async (image, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    };
    try {
      const res = await axios.get("https://animixgallerybackend.herokuapp.com/api/users/getallphotos", config);
      localStorage.setItem("userGallery", JSON.stringify(res.data.images));
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userGalleryInfo = localStorage.getItem("userGallery")
  ? JSON.parse(localStorage.getItem("userGallery"))
  : null;

const initialError = {
  open: false,
  message: "",
  type: "success",
};

const initialState = {
  loading: false,
  error: initialError,
  image: "",
  images: userGalleryInfo
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    gremoveAlert(state, action) {
      state.error = initialError;
    },
  },
  extraReducers: {
    [uploadImage.pending]: (state, action) => {
      state.loading = true;
    },
    [uploadImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.image = action.payload.post.photo;
      state.error.open = true;
      state.error.message = action?.payload?.message;
    },
    [uploadImage.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.type = "error";
      state.error.message = action?.payload?.message;
    },
    [getAllImages.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = action.payload.images;
    },
    [getAllImages.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.type = "error";
      state.error.message = action?.payload?.message;
    },
    [deleteImage.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
    },
    [deleteImage.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.type = "error";
      state.error.message = action?.payload?.message;
    },
  },
});


export const galleryActions = gallerySlice.actions 

export default gallerySlice.reducer;
