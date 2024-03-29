import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {user: User}
export type AppDispatch = typeof store.dispatch;

export default store;
