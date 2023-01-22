import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    loginFailure: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    logOut: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.isError = false;
    },
    subscribe: (state, action) => {
      if (!state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.push(action.payload);
       
      }
    },
    unsubscribe: (state, action) => {
      if(state.currentUser.subscribedUsers.includes(action.payload)){
         state.currentUser.subscribedUsers.splice(
            state.currentUser.subscribedUsers.findIndex(
              (id) => id === action.payload),1);
      }
     
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logOut, subscribe,unsubscribe } =
  userSlice.actions;
export default userSlice.reducer;
