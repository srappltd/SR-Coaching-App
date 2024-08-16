import { AntDesign, Entypo, Feather, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLogout } from '../store/actions/authToken'

const ProfileScreen = () => {
    const navigate = useNavigation(null)
    const dispatch = useDispatch(null)
    const logoutHanlder = async ()=>{
        try {
          return dispatch(asyncLogout(navigate))
        } catch (error) {
            return ToastAndroid.show(error)
        }
      }
    const {client} = useSelector(state=>state.authReducer)
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={{ width: "auto", height: 180, display: "flex", justifyContent: "center", alignItems: "center", }}>
                <View style={{ width: 80, height: 80, position: "relative" }}>
                    <Image source={{ uri:  client && client.picture ? client.picture  : 'https://static-00.iconduck.com/assets.00/user-square-icon-512x510-19atct3z.png' }} style={{ width: "100%", height: "100%", backgroundColor: "rgba(240, 240, 240, 0.78)", objectFit: "cover", borderRadius: 25, overflow: "hidden" }}></Image>
                    <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: "rgba(235, 235, 235, 1)", borderWidth: 2, borderColor: "white", position: "absolute", bottom: -10, borderRadius: 5, right: -10, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }} activeOpacity={.8}>
                        <Feather name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 15, fontWeight: "800", fontSize: 18, textTransform: 'uppercase' }}>{client && client.firstname + ' ' + client.lastname}</Text>
            </View>
            <View style={{ width: "auto", paddingVertical: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 50, flexDirection: "row" }}>
                {/* // wallet  */}
                <TouchableOpacity style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Entypo name="wallet" size={24} color="rgba(70, 70, 70, 1)" />
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "rgba(70, 70, 70, 1)" }}>My Wallet</Text>
                </TouchableOpacity>
                {/* // download   */}
                <TouchableOpacity style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FontAwesome name="cloud-download" size={24} color="rgba(70, 70, 70, 1)" />
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "rgba(70, 70, 70, 1)" }}>My Download</Text>
                </TouchableOpacity>
                {/* // edit profile  */}
                <TouchableOpacity onPress={()=>navigate.navigate('EditProfile')} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AntDesign name="edit" size={24} color="rgba(70, 70, 70, 1)" />
                    <Text style={{ fontSize: 13, fontWeight: "500", color: "rgba(70, 70, 70, 1)" }}>Edit</Text>
                </TouchableOpacity>

            </View>
            <View style={{ width: "auto", paddingVertical: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 30, paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderColor: "rgba(225, 225, 225, 0.49)" }}>
                    <MaterialIcons name="account-box" size={24} color="rgba(100, 100, 100, 0.94)" />
                    <Text style={{ textTransform: "uppercase", color: 'rgba(100, 100, 100, 0.94)' }}>{client && client.firstname + ' '+ client.lastname }</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 30, paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderColor: "rgba(225, 225, 225, 0.49)" }}>
                    <Entypo name="email" size={20} color="rgba(100, 100, 100, 0.94)" />
                    <Text style={{ color: 'rgba(100, 100, 100, 0.94)' }}>{client && client.email}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 35, paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderColor: "rgba(225, 225, 225, 0.49)" }}>
                    <Foundation name="telephone" size={24} color="rgba(100, 100, 100, 0.94)" />
                    <Text style={{ textTransform: "uppercase", color: 'rgba(100, 100, 100, 0.94)' }}>{client && client.mobile}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 30, paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderColor: "rgba(225, 225, 225, 0.49)" }}>
                    <MaterialCommunityIcons name="card-account-details-outline" size={24} color="rgba(100, 100, 100, 0.94)" />
                    <Text style={{ textTransform: "uppercase", color: 'rgba(100, 100, 100, 0.94)' }}>{client && client.batchName }</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 30, paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderColor: "rgba(225, 225, 225, 0.49)" }}>
                    <MaterialIcons name="verified-user" size={24} color="rgba(0, 174, 102, 1)" />
                    <Text style={{ color: 'rgba(0, 174, 102, 1)' }}>{client && client.username}</Text>
                </View>
                <TouchableOpacity onPress={logoutHanlder} style={{ width: '100%', paddingHorizontal: 15, marginTop: 40 }} activeOpacity={.8}>
                    <Text style={{ width: "100%", backgroundColor: "rgba(0, 174, 102, 1)", textAlign: "center", paddingVertical: 10, color: "white", fontWeight: "600", textTransform: "uppercase", borderRadius: 4 }}>Logout</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", marginTop: 20, fontWeight: "700", color: "rgba(95, 95, 95, 0.78)" }}>OR</Text>
                <TouchableOpacity style={{ width: '100%', paddingHorizontal: 15, marginTop: 20 }} activeOpacity={.8}>
                    <Text style={{ width: "100%", backgroundColor: "rgba(174, 0, 57, .9)", textAlign: "center", paddingVertical: 10, color: "white", fontWeight: "600", textTransform: "uppercase", borderRadius: 4 }}>Account Delete Permanent</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    )
}

export default ProfileScreen
