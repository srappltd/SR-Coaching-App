import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authTokenReducer";

export const store = configureStore({
    reducer:{
        authReducer
    }
})