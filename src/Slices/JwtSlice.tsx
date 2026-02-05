import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    token:localStorage.getItem("token") || null,
};
const jwtSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers:{
        setJwt:(state, action)=>{
            state.token = action.payload;
            localStorage.setItem("token" ,action.payload)
        },
        removeJwt:(state)=>{
            state.token = null;
            localStorage.removeItem("token");
        }

    }
})

export const {setJwt, removeJwt}=jwtSlice.actions;
export default jwtSlice.reducer;