import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import seatSlice from "./slices/seatSlice"

const store = configureStore({
    reducer: {
        user: userSlice,
        seat: seatSlice,
    },

    devTools: import.meta.env.NODE_ENV !== "production",
});

export default store