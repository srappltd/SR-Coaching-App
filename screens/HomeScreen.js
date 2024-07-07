import { StatusBar } from 'expo-status-bar'
import { DrawerLayoutAndroid, Image, RefreshControl, ScrollView, Text,Animated, TextInput, TouchableOpacity, View } from 'react-native'
import VideoCard from './conponent/VideoCard'
import { useContext, useEffect, useRef, useState } from 'react'
import LeftMenu from './conponent/LeftMenu'
import { MenuLeftContext } from '../context/MenuConext'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import PlaylistCard from './conponent/PlaylistCard'
import { Axios } from '../utils/Axios'

const HomeScreen = () => {
    const navigate = useNavigation()
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

    
    const dispatch = useDispatch(null)
    const [playlists,setPlaylists] = useState(null)
    

    const refreshHanlder = () => {
        setRefreshing(true);
        setTimeout(() => {
            getPlaylistHandler()
            setVideos(videosArray)
            setRefreshing(false)
        }, 2000)
    }

    const getPlaylistHandler = async ()=>{
        try {
            const {data} = await Axios.get("/playlists")
            // console.log(data)
            if(data.success) return setPlaylists(data.playlists)
        } catch (error) {
            // console.log(error.response.data.message)
        }
    }

    useEffect(()=>{
        getPlaylistHandler()
    },[])
    // console.log(playlists)

    const { drawerRef } = useContext(MenuLeftContext)
    const { authToken, client } = useSelector(state => state.authReducer)
    return (
        <>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHanlder} colors={['red', 'green', 'blue', 'black', 'orange']} />}>
                <View style={{ width: 'auto', backgroundColor: "#ffff", padding: 10 }}>
                    <View style={{ width: "auto" }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: "#" }}>Mark batch as default</Text>
                        <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <Text style={{ paddingVertical: 8, paddingHorizontal: 20, fontSize: 18, fontWeight: "700", marginTop: 2, borderRadius: 5, borderWidth: 1.3, borderColor: "#dbdbdb", backgroundColor: "#f7f7f7" }}>{client && client.batchName}</Text>
                        </TouchableOpacity>
                        <View style={{ width: "auto", display: "flex", paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, flexDirection: "row", alignItems: "center", borderRadius: 5, gap: 10, backgroundColor: "#f7f7f7" }}>
                            <Image source={{ uri: "https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png" }} style={{ width: 20, height: 20 }} />
                            <TextInput style={{ width: "90%", fontSize: 14, fontWeight: "400", color: "#000" }} inputMode='search' placeholder='Search here..' />
                        </View>
                        <Text style={{ fontWeight: "500", fontSize: 12, marginTop: 5, color: '#4d4d4d' }}>Batched marked as default will be shown here 👇</Text>
                        <View style={{ width: "auto", marginTop: 8, display: "flex", gap: 0 }}>


                            {/* // playlist card */}
                            {playlists && playlists.map(playlist=>(
                                <PlaylistCard key={playlist._id} playlist={playlist}/>
                            ))}


                            

                        </View>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}

export default HomeScreen

