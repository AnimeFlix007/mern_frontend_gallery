import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/user/userSlice";
import gallerySlice from "../slices/gallery/gallerySlice";

const reducers = combineReducers({
  users: userSlice,
  gallery: gallerySlice
});

const store = configureStore({
  reducer: reducers,
});

export default store;
