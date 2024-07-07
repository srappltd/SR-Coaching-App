import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import VideoCard from './conponent/VideoCard'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

const PlaylistVIdeos = () => {
    const navigate = useRoute(null)
    const videosArray = [
        {
            id: "01",
            title: "CSS Crash Course: Master the Essentials in One Video! Elevate Your Front-End Skills Now!",
            uri: "https://i.ytimg.com/vi/K1naz9wBwKU/maxresdefault.jpg",
            mentorName: "Harsh Sharma",
            time: "05:01"
        },
        {
            id: "02",
            title: "4 Months Proven Strategy for Placements🔥| Avoid these mistakes",
            uri: "https://i.ytimg.com/vi/afsMDotwJzg/maxresdefault.jpg",
            mentorName: "Harsh Sharma",
            time: "04:21"
        },
        {
            id: "03",
            title: "[LIVE] JavaScript Interview Questions | JS Questions",
            uri: "https://i.ytimg.com/vi/GLgbWZpZg8A/maxresdefault.jpg",
            mentorName: "Harsh Sharma",
            time: "05:01"
        },
        {
            id: "04",
            title: "Front-End Domination: Create Anything with Code",
            uri: "https://ik.imagekit.io/sheryians/courses_gif/Front-End_Domination__Create_Anything_with_Code-FRONTENDTHUBNAIL_Wf8WqcNJx.jpg",
            mentorName: "Harsh Sharma",
            time: "35:51"
        },
        {
            id: "05",
            title: "Backend Domination | Complete Course | Sheryians",
            uri: "https://ik.imagekit.io/sheryians/courses_gif/undefined-backend_0.5x_Medium_wgHDU-5rPt.png",
            mentorName: "Harsh Sharma",
            time: "20:41"
        },
        {
            id: "01",
            title: "CSS Crash Course: Master the Essentials in One Video! Elevate Your Front-End Skills Now!",
            uri: "https://i.ytimg.com/vi/K1naz9wBwKU/maxresdefault.jpg",
            mentorName: "Harsh Sharma",
            time: "05:01"
        },
        {
            id: "02",
            title: "4 Months Proven Strategy for Placements🔥| Avoid these mistakes",
            uri: "https://i.ytimg.com/vi/afsMDotwJzg/maxresdefault.jpg",
            mentorName: "Harsh Sharma",
            time: "04:21"
        },
        {
            id: "03",
            title: "[LIVE] JavaScript Interview Questions | JS Questions",
            uri: "https://i.ytimg.com/vi/GLgbWZpZg8A/maxresdefault.jpg",
            mentorName: "Harsh Sharma",
            time: "05:01"
        },
        {
            id: "04",
            title: "Front-End Domination: Create Anything with Code",
            uri: "https://ik.imagekit.io/sheryians/courses_gif/Front-End_Domination__Create_Anything_with_Code-FRONTENDTHUBNAIL_Wf8WqcNJx.jpg",
            mentorName: "Harsh Sharma",
            time: "35:51"
        },
        {
            id: "05",
            title: "Backend Domination | Complete Course | Sheryians",
            uri: "https://ik.imagekit.io/sheryians/courses_gif/undefined-backend_0.5x_Medium_wgHDU-5rPt.png",
            mentorName: "Harsh Sharma",
            time: "20:41"
        },

    ]
    const [videos, setVideos] = useState(videosArray)
    const [refreshing, setRefreshing] = useState(false)
    const [playlist,setPlaylist] = useState(navigate.params)
    // console.log({playlist})
    const refreshHanlder = () => {
        setRefreshing(true);
        setTimeout(() => {
            setVideos(videosArray)
            setPlaylist(navigate.params)
            setRefreshing(false)
        }, 2000)
    }
    
    return (
        <>
            <StatusBar style='auto' />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHanlder} colors={['red', 'green', 'blue', 'black', 'orange']} />} style={{ width: "auto", backgroundColor: "#ffffff", paddingHorizontal: 10, paddingVertical: 5 }}>
                <View style={{ width: "auto", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ width: '90%' }}>
                        <Text style={{ fontSize: 18, fontWeight: "700",color:"rgba(18, 193, 153, 0.97)" }} numberOfLines={2}>{playlist.title}</Text>
                        <Text style={{ fontSize: 14, color: "#707070", marginTop: 5, fontWeight: "500" }} numberOfLines={3}>{playlist.description}</Text>
                        <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", marginTop: 5 }} >
                            <Text style={{ paddingVertical: 8, paddingHorizontal: 20, fontSize: 13, fontWeight: "700", marginTop: 2, borderRadius: 5, color: "white", backgroundColor: "#53b3fc", textTransform: 'uppercase' }}>{playlist.videos.length+' Videos'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: "flex", justifyContent: "space-between" }}>
                        <TouchableOpacity>
                            <Ionicons name={'share-social-sharp'} size={26} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={refreshHanlder}>
                            <Ionicons name={'reload-circle'} size={28} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ width: "auto", marginTop: 10, marginBottom: 10 }}>
                    {/* // videos card  */}
                    {playlist && playlist.videos.length > 0 &&
                        playlist.videos.map(({ _id, poster,video_url,description, title, mentor, duration }, index) => (
                            <VideoCard key={index} item={{ _id, title,description, poster,video_url, mentor, duration }} />
                        ))
                    }
                </View>
            </ScrollView>
        </>
    )
}

export default PlaylistVIdeos
