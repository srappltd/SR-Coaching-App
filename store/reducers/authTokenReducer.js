import { createSlice } from "@reduxjs/toolkit";

const authReducerSlice = createSlice({
    name:"auth",
    initialState:{
        authToken:null,
        isLoggedIn:false,
        client:null
    },
    reducers:{
        getAuth:(state,action)=>{
            state.authToken = action.payload
            state.isLoggedIn = true
        },
        getClient:(state,action)=>{
            state.client = action.payload
        },
        getLogout:(state,action)=>{
            state.authToken = action.payload
            state.client = null
            state.isLoggedIn = false
        }
    }
})

export const authReducer = authReducerSlice.reducer
export const {getAuth,getLogout,getClient} = authReducerSlice.actions