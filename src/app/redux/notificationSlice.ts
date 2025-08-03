import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    announcement: true,
    notificationOrder: false,
    notificationStatus: false,
    orderCount: 0,
    statusCount: 0,
    historyCount: 0,
  },
  reducers: {
    notifAnnouncement(state) {
      state.announcement = false;
    },
    notifAnnouncementTrue(state) {
      state.announcement = true;
    },
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

export const {
  notifOrder,
  notifStatus,
  orderCount,
  statusCount,
  clearNotification,
  historyCount,
  notifAnnouncement,
  notifAnnouncementTrue,
} = notificationSlice.actions;

export default notificationSlice.reducer;
