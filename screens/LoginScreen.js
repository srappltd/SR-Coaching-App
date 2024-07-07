import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import {Axios} from '../utils/Axios'
import { Button, Image, StatusBar, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { asyncSiginIn } from '../store/actions/authToken'

const LoginScreen = () => {
  const navigate = useNavigation(null)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch(null)
  const loginSubmitHandler = async ()=>{
    try {
      if(email && password){
        const loginForm = {email,password}
        dispatch(asyncSiginIn(loginForm,navigate))
        
      }
      
    } catch (error) {
      // ToastAndroid.show(error)
      // console.log(error.response.data)
    }
    // ToastAndroid.show("Please enter your email & password!")
  }
  return (
    <View style={{width:'auto',height:"100%",backgroundColor:"#ffff"}}>
      <StatusBar backgroundColor={"#ffff"} barStyle={"dark-content"}/>
      <View style={{width:'auto',display:"flex",flexDirection:"row",backgroundColor:"#ffff"}}>
        <Image source={{uri:"https://cdn3d.iconscout.com/3d/premium/thumb/web-development-5402863-4521476.png?f=webp"}} style={{width:'60%',marginRight:"auto",height:200}}/>
        <Image source={require("../assets/channels4_profile.jpg")} style={{width:100,margin:"auto",marginRight:20,height:100}}/>
      </View>
      <View style={{width:"auto",display:"flex",marginTop:40,alignItems:"center",justifyContent:"center"}}>
        <Text style={{fontSize:23,fontWeight:"600",color:"#06b870"}}>Welcome !</Text>
        <Text style={{fontSize:27,fontWeight:"800"}}>to Sheryians</Text>
        <Text style={{fontSize:10,marginTop:5}}>Best Teacher | Best Mentor | Affordable Pricing | Live Batches | Notes</Text>
      </View>
      <View style={{width:"auto",padding:14,marginTop:5}}>
        <View style={{borderColor:"#c7c7c7",borderRadius:4,borderWidth:1.2,paddingVertical:7,paddingHorizontal:10}}>
          <TextInput style={{fontSize:15}} inputMode='email' value={email} onChangeText={setEmail} placeholder='Enter email address'/>
        </View>
        <View style={{borderColor:"#c7c7c7",borderRadius:4,marginTop:10,borderWidth:1.2,paddingVertical:7,paddingHorizontal:10}}>
        <TextInput secureTextEntry={true}  style={{fontSize:15}} inputMode='text' value={password} onChangeText={setPassword} placeholder='Enter password'/>
        </View>
        
          <TouchableOpacity onPress={loginSubmitHandler} style={{width:"auto",backgroundColor:"#5bc4fc",padding:12,borderRadius:4,marginTop:300}}>
            <Text style={{margin:"auto",fontWeight:"700",color:"#fff",}}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={{fontSize:11,marginTop:10,color:'#7a7a7a',fontWeight:"500",margin:"auto"}}>by Continuing you agree to our <Text style={{color:"#5bc4fc"}}>Terms of Use & Privacy Policy</Text></Text>
      </View>
    </View>
  )
}

export default LoginScreen
