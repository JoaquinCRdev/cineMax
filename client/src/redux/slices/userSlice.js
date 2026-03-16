import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, name, email } = action.payload;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.isAuthenticated = true;
        },

        removeUser: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;