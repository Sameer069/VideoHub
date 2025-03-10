import {createSlice} from "@reduxjs/toolkit"


 const initialState={
   
    history:[],
    historyCount:0
    

 }

const VideoSlicer=createSlice({
    name:"videoHistory",
     initialState,
    reducers:{
        addToSaveList:(state,action)=>{
                state.history.unshift({...action.payload})
                state.historyCount=state.history.length
           
           
        },
      
        deleteSavelist:(state,action)=>{
            state.history=[]
            state.historyCount=state.history.length
        }
    }
})
export const{addToSaveList,deleteSavelist} =VideoSlicer.actions
export default VideoSlicer.reducer