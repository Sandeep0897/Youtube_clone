import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentVideo:null,
    isLoading:false,
    isError:false
   };
 
   export const videoSlice = createSlice({
     name: 'video',
     initialState,
     reducers: {
      videoRequest:(state)=>{
       state.isLoading = true;
      },
      videoSuccess:(state,action)=>{
       state.currentVideo=action.payload;
       state.isLoading=false;
       state.isError=false;
      },
      videoFailure:(state)=>{
      state.isError=true;
      state.isLoading = false;
      },
      videoLike:(state,action)=>{
       if(!state.currentVideo.likes.includes(action.payload)){
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((id)=>
        id === action.payload),1)
       }else{
        state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((id)=>
        id === action.payload),1);
       }
      },
      videoDislike:(state,action)=>{
        if(!state.currentVideo.dislikes.includes(action.payload)){
            state.currentVideo.dislikes.push(action.payload);
            state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((id)=>
                id === action.payload
            ),1)
        }else{
          state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((id)=>
            id === action.payload
          ),1)
        }
      }
    
     
     }
   });
 
   export const {videoRequest,videoSuccess,videoFailure,videoLike,videoDislike} =videoSlice.actions;
   export default  videoSlice.reducer;