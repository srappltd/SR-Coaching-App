import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Axios, baseURL2 } from '../../utils/Axios'
import { useNavigation } from '@react-navigation/native'

const PlaylistCard = ({playlist}) => {
    const navigate = useNavigation(null)
    const {_id,title,description,poster} = playlist
    const playClickHandler = (playlist)=>{
        // console.log(id)
        navigate.navigate('Playlist',playlist)
    }
    const mentorProfileHanlder = (id)=>{
        // console.log(id)
    }
    return (
        <View style={{ width: "auto" }} >
            <TouchableOpacity onPress={()=>playClickHandler(playClickHandler && playlist )} activeOpacity={20} style={{ position: "relative", height: 210, paddingTop: 8 }}>
                <Image source={{uri: playlist && baseURL2+poster}} style={{ width: "auto", height: "100%", borderRadius: 10, backgroundColor: "red" }} />
                <View style={{ width: "94%", height: "100%", left: "3%", borderRadius: 12, zIndex: -1, position: "absolute", top: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.1)", justifyContent: "center", alignItems: "center" }}></View>
            </TouchableOpacity>
            <View style={{ width: "auto", display: "flex", flexDirection: "row", paddingVertical: 10, justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => mentorProfileHanlder(playlist && _id)} style={{ width: "90%" }}>
                    <Text style={{ fontWeight: "500", fontSize: 14 }} numberOfLines={1}>{playlist && title }</Text>
                    <Text style={{ fontWeight: "700", fontStyle: "italic", fontSize: 12, color: "#1a8cff", display: "flex", flexDirection: "row", gap: 10 }} numberOfLines={1}><Text style={{ color: "#00cccc", fontStyle: "normal", fontWeight: "600", marginLeft: 10 }}>Mentor Name-</Text> {'Admin'}</Text>

                </TouchableOpacity>
                {false && <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/8428/8428471.png" }} style={{ width: 18, height: 18 }} />}

            </View>
        </View>
    )
}

export default PlaylistCard
