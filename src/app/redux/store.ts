import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["notifications"],
  transforms: [
    {
      in: (inboundState: any) => {
        // Jangan simpan nilai announcement saat persist
        const { announcement, ...rest } = inboundState;
        return rest;
      },
      out: (outboundState: any) => {
        return {
          announcement: true, // reset ke true saat aplikasi dimuat ulang
          ...outboundState,
        };
      },
      config: { whitelist: ["notifications"] },
    },
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // penting agar redux-persist tidak error
    }),
});

export const persistor = persistStore(store);
