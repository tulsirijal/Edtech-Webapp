import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading:false,
    signupData:null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setToken:(state,actions)=>{
            state.token = actions.payload
        },
        setLoading:(state,actions)=>{
            state.loading = actions.payload
        },
        setSignupData:(state,actions)=>{
            state.signupData = actions.payload
        }
    }
})
export const {setToken,setLoading,setSignupData} = authSlice.actions
export default authSlice.reducer