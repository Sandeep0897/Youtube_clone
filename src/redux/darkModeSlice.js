import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dark: false
}

export const darkSlice = createSlice({
    name:"dark",
    initialState,
    reducers:{
        toggleDarkMode: (state)=>{
            state.dark = !state.dark;
        }
    }
});

export const { toggleDarkMode } = darkSlice.actions;
export default darkSlice.reducer;