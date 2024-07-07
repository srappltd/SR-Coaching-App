import React from 'react'
import {Button, Text, View } from 'react-native'
import { Axios } from '../../utils/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const LeftMenu = () => {
  const navigate = useNavigation()
  const logoutHanlder = async ()=>{
    const {data} = await Axios.get("/client/logout")
    if(data.success){
      // console.log(data)
      await AsyncStorage.setItem("token",'')
      await AsyncStorage.setItem("isLoggedIn",'')
      await AsyncStorage.setItem("client",'')
      navigate.navigate('Login')
    }
  }
  return (
    <View style={{width:"auto",padding:10}}>
       <View style={{width:"auto"}}>
        <Button title='Logout' onPress={logoutHanlder}/>
       </View>
    </View>
  )
}

export default LeftMenu
