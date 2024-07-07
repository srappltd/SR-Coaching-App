import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Axios } from '../../utils/Axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getLogout } from '../../store/reducers/authTokenReducer'
import { asyncLogout } from '../../store/actions/authToken'

const LogoutBtn = () => {
    const navigate = useNavigation(null)
    const dispatch = useDispatch(null)
    const logoutHanlder = async ()=>{
        try {
          dispatch(asyncLogout(navigate))
        } catch (error) {
            ToastAndroid.show(error)
        }
      }
  return (
    <View>
        <TouchableOpacity onPress={logoutHanlder}>
        <Ionicons name="log-in-outline" size={30} style={{marginRight:10}} color="#19c9fa" />

        </TouchableOpacity>
    </View>
  )
}

export default LogoutBtn
