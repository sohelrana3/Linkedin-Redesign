import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userg",
    initialState: {
        logUser: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
    },
    reducers: {
        loginData: (state, actions) => {
            state.logUser = actions.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginData } = userSlice.actions;

export default userSlice.reducer;
