import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import {Picker} from '@react-native-picker/picker'

const EditProfile = () => {
    const {client} = useSelector(state=>state.authReducer)

  return (
    <ScrollView style={{backgroundColor:"white"}}>
        <View style={{ width: "auto", height: 180, display: "flex", justifyContent: "center", alignItems: "center", }}>
                <View style={{ width: 80, height: 80, position: "relative" }}>
                    <Image source={{ uri:  client && client.picture ? client.picture  : 'https://static-00.iconduck.com/assets.00/user-square-icon-512x510-19atct3z.png' }} style={{ width: "100%", height: "100%", backgroundColor: "rgba(240, 240, 240, 0.78)", objectFit: "cover", borderRadius: 25, overflow: "hidden" }}></Image>
                    <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: "rgba(235, 235, 235, 1)", borderWidth: 2, borderColor: "white", position: "absolute", bottom: -10, borderRadius: 5, right: -10, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }} activeOpacity={.8}>
                        <Feather name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
    </ScrollView>
  )
}

export default EditProfile
