import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/user/userSlice";

const reducers = combineReducers({
  users: userSlice,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
