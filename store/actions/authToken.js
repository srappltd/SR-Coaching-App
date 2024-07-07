import AsyncStorage from "@react-native-async-storage/async-storage"
import { ToastAndroid } from "react-native"
import { Axios } from "../../utils/Axios"
import { getAuth, getClient, getLogout } from "../reducers/authTokenReducer"

export const asyncInit = ()=>async (dispatch)=>{
    try {
        const token = await AsyncStorage.getItem("token")
        const client = await AsyncStorage.getItem("client")
        // console.log({client})
        if(token != null){
            dispatch(getAuth(token))
            dispatch(getClient(JSON.parse(client)))
        }
    } catch (error) {
        return ToastAndroid.show(error.response.data.message,ToastAndroid.SHORT)
    }
}

export const asyncSiginIn = (formData,navigate)=>async (dispatch)=>{
    // 
    try {
        const {data} = await Axios.post("/client/login",formData)
        if(data.success){
            dispatch(getAuth(data.token))
            dispatch(getClient(data.client))
          ToastAndroid.show("Login successfully!",ToastAndroid.SHORT)
          await AsyncStorage.setItem("token",JSON.stringify(data.token))
          await AsyncStorage.setItem("client",JSON.stringify(data.client))
          await AsyncStorage.setItem("isLoggedIn",JSON.stringify(true))
          return navigate.navigate("Home")
        }
    } catch (error) {
        return ToastAndroid.show(error.response.data.message,ToastAndroid.SHORT)
    }
}

export const asyncLogout = (navigate)=>async (dispatch)=>{
    try {
        await AsyncStorage.clear()
        dispatch(getLogout(null))
        return navigate.navigate('Login')
            
    } catch (error) {
        return ToastAndroid.show(error.response.data.message,ToastAndroid.SHORT)
    }
}


export const asyncComment = (commentForm,setToast) => async (dispatch)=>{
    try {
        const {data} = await Axios.post("/client/comment",commentForm)
        if(data.success){
            setToast(data.message)
        }
    } catch (error) {
        return ToastAndroid.show(error.response.data.message,ToastAndroid.SHORT)
    }
}

export const asyncCommentDelete = (commentId,setToast) => async (dispatch)=>{
    try {
        const {data} = await Axios.post(`/client/comment/delete/${commentId}`);
        if(data.success){
            setToast(data.message);
            return ToastAndroid.show(data.message,ToastAndroid.SHORT)
        }
    } catch (error) {
        return ToastAndroid.show(error.response.data.message,ToastAndroid.SHORT)
    }
}