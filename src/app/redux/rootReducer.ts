import { combineReducers } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";

const rootReducer = combineReducers({
  notifications: notificationReducer,
});

export default rootReducer;
