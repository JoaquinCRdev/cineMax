import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const seatSlice = createSlice({
    name: "seat",
    initialState,
    reducers: {
        setSeats: (state, action) => {
            state.push(action.payload);
        },
        clearSeats: (state) => {
            return [];
        }
    }
});

export const { setSeats, clearSeats } = seatSlice.actions;
export default seatSlice.reducer;