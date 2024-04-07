import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define slice for notifications
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notificationOrder: false,
    notificationStatus: false,
    orderCount: 0,
    statusCount: 0,
    historyCount: 0,
  },
  reducers: {
    notifOrder(state) {
      state.notificationOrder = true;
    },
    notifStatus(state) {
      state.notificationStatus = true;
    },
    orderCount(state, action) {
      state.orderCount = action.payload;
    },
    statusCount(state, action) {
      state.statusCount = action.payload;
    },
    historyCount(state, action) {
      state.historyCount = action.payload;
    },
    clearNotification(state) {
      state.notificationOrder = false;
      state.notificationStatus = false;
    },
  },
});

// Extract action creators from slice
export const {
  notifOrder,
  notifStatus,
  orderCount,
  statusCount,
  clearNotification,
  historyCount,
} = notificationSlice.actions;

// Combine reducers using configureStore
const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
  },
});

export default store;
