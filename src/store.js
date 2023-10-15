import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/user/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
