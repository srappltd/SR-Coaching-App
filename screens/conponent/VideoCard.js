import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import { baseURL2 } from '../../utils/Axios'
import { Video } from 'expo-av'

const VideoCard = ({item}) => {
    const {_id, title, poster,description, mentor,video_url,duration} = item
    const navigate = useNavigation(null)
    const handlePress = (video) => {
        navigate.navigate('Play',video)
    }
    const mentorProfileHanlder = (mentor)=>{
        // alert(mentor)
        
    }
    return (
        <View style={{ width: "auto" }} >
            <TouchableOpacity activeOpacity={20} onPress={()=>handlePress(item)} style={{ position: "relative" }}>
                <Image source={{uri:baseURL2+poster}} style={{ width: "auto", height: 210, borderRadius: 10, backgroundColor: "red" }} />
                <Text style={{ position: "absolute",backgroundColor:"rgba(0, 0, 0, 0.55)",paddingHorizontal:5,paddingVertical:3,borderRadius:4, bottom: 7, right: 7, color: "#fff", fontWeight: "800", fontSize: 12, textAlign: "right" }}>{duration}</Text>
            </TouchableOpacity>
            <View style={{ width: "auto", display: "flex", flexDirection: "row", paddingVertical: 10, justifyContent: "space-between" }}>
                <TouchableOpacity onPress={()=>mentorProfileHanlder('Abhay')} style={{ width: "90%" }}>
                    <Text style={{ fontWeight: "500", fontSize: 14 }} numberOfLines={1}>{title}</Text>
                    <Text style={{ fontWeight: "700", fontStyle: "italic", fontSize: 12, color: "#1a8cff", display: "flex", flexDirection: "row", gap: 10 }} numberOfLines={1}><Text style={{ color: "#00cccc", fontStyle: "normal", fontWeight: "600", marginLeft: 10 }}>Mentor Name-</Text> {mentor.username}</Text>

                </TouchableOpacity>
                {false && <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/8428/8428471.png" }} style={{ width: 18, height: 18 }} />}

            </View>
        </View>
    )
}

export default VideoCard
