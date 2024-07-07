import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, ProgressBarAndroidBase, RefreshControl, SafeAreaView, ScrollView, ScrollViewBase, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Video, VideoFullscreenUpdate } from 'expo-av'
// import Video from 'react-native-video'
import { Ionicons, MaterialIcons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation';
import { MenuLeftContext } from '../context/MenuConext';
import { StackView } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatTime from '../utils/formatTime';
import CommentCard from './conponent/CommentCard';
import { Axios, baseURL2 } from '../utils/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { asyncComment } from '../store/actions/authToken';

const { width, height } = Dimensions.get('window');


const ViewVideo = () => {
  const videoRef = useRef(null)
  const navigation = useNavigation(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [status, setStatus] = useState({});

  const [controlsVisible, setControlsVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let hideControlsTimeout;
    if (controlsVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();

      hideControlsTimeout = setTimeout(() => {
        setControlsVisible(false);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }, 3000);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
    return () => {
      clearTimeout(hideControlsTimeout);
    };
  }, [controlsVisible]);

  const handlePlayPause = () => {
    if (status.didJustFinish) {
      videoRef.current.replayAsync();
    } else if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const handleBackward = async () => {
    if (videoRef.current && status.positionMillis) {
      let newPosition = status.positionMillis - 5000; // 10 seconds backward
      if (newPosition < 0) newPosition = 0;
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleForward = async () => {
    if (videoRef.current && status.positionMillis) {
      let newPosition = status.positionMillis + 5000; // 10 seconds forward
      if (newPosition > status.durationMillis) newPosition = status.durationMillis;
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleFullScreen = async () => {
    if (isFullScreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setIsFullScreen(!isFullScreen);
  };

  const toggleControlsVisibility = () => {
    setControlsVisible(!controlsVisible);
  };

  

  const {params} = useRoute(null)
  const [item,setIem] = useState(null)
  const {client} = useSelector(state=>state.authReducer)
  const getVideo = async () =>{
    try {
      const {data} = await Axios.get(`/video/${params._id}`)
      if(data.success){
        setIem(data.post)
      }
    } catch (error) {
      ToastAndroid.show(error.response.data.message,ToastAndroid.SHORT)
    }
  }
  

  const [refreshing, setRefreshing] = useState(false)
    const refreshHanlder = () => {
        setRefreshing(true);
        setTimeout(() => {
          getVideo()
            setRefreshing(false)
        }, 2000)
    }
    const [comment,setComment] = useState('')
    const dispatch = useDispatch(null)
    const [toast,setToast] = useState('')
    const commentHandler = ()=>{
      if(comment && item._id && client._id ){
        commentForm = {comment,videoid: item._id,clientid:client._id}
        dispatch(asyncComment(commentForm,setToast))
        setComment('')
        setToast('')
        return ToastAndroid.show("Add comment successfully! "+comment,ToastAndroid.SHORT)
      }
      ToastAndroid.show("Add to comment",ToastAndroid.SHORT)
    }
    useEffect(()=>{
      getVideo()
      setInterval(()=>{
        item && item.comment.length > 0 && getVideo()
      },30000)
    },[toast])
  return (

    <View style={{ width: "auto", paddingTop: isFullScreen ? 0 : 40,backgroundColor:"#fff" }}>
      {!isFullScreen && <View style={{ paddingHorizontal: 15, paddingVertical: 10,gap:10, borderBottomWidth: 1, borderColor: "#d9d9d9", display: "flex", alignItems: "center",justifyContent:"space-between",flexDirection:"row" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Playlist")}>
          <MaterialIcons name="arrow-back" size={27} style={{ fontWeight: "800" }} color="black" />
        </TouchableOpacity>
        <Text numberOfLines={1} style={{width:"90%",fontWeight:"600",fontSize:18}}>{item && item.title}</Text>
      </View>}
      {/* // controller  */} 
      <TouchableWithoutFeedback onPress={toggleControlsVisibility}>
        <SafeAreaView style={{ width: "auto", position: "relative",zIndex:20 }}>
          <Video ref={videoRef} source={{ uri:item && baseURL2+item.video_url }} posterSource={{ uri: item && baseURL2+item.poster }} usePoster style={{ width: "auto", height: isFullScreen ? '100%' : 220, backgroundColor: "#000" }} isLooping={false} onPlaybackStatusUpdate={status => setStatus(() => status)} resizeMode='contain' />

          {/* //controller div */}
          {controlsVisible && <Animated.View style={{ width: '100%', height: "100%", position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", opacity: fadeAnim, durationMillis: 200 }}>
            {/* // cender btn  */}
            {!status.isPlaying && <TouchableOpacity onPress={handlePlayPause} style={{ width: 50, height: 50, backgroundColor: "rgba(120, 120, 120, 0.42)", borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={'play'} size={24} color="white" />
            </TouchableOpacity>}
            {/* // bottombar  */}
            <View style={{ width: "auto", position: "absolute", bottom: 0, paddingVertical: isFullScreen ? 15 : 10, paddingHorizontal: 15, backgroundColor: isFullScreen ? "rgba(20, 20, 20, 0.42)" : "rgba(120, 120, 120, 0.42)" }}>

              {/* //progressbar  */}
              <View style={{ width: "auto" }}></View>
              {/* //controller  */}
              <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                {/* // pay paush  */}
                <TouchableOpacity onPress={handlePlayPause}>
                  <Ionicons name={status.isPlaying ? 'pause' : 'play'} size={22} color="white" />
                </TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row", gap: 15, alignItems: "center" }}>

                  {/* //backward */}
                  <TouchableOpacity onPress={handleBackward}>
                    <Ionicons name="play-back" size={22} color="#fff" />
                  </TouchableOpacity>

                  {/* //forwrard */}
                  <TouchableOpacity onPress={handleForward}>
                    <Ionicons name="play-forward" size={22} color="#fff" />
                  </TouchableOpacity>
                  {/* // timer  */}
                  <Text style={{ fontWeight: "700", color: 'white' }}>
                    {formatTime(status.positionMillis)} / {formatTime(status.durationMillis)}
                  </Text>
                  {/* // setting  */}
                  {/* <TouchableOpacity>
                    <Ionicons name="settings-sharp" size={22} color="white" />
                  </TouchableOpacity> */}
                  {/* // screen full */}
                  <TouchableOpacity onPress={handleFullScreen}>
                    <MaterialIcons name={isFullScreen ? "fullscreen-exit" : "fullscreen"} size={30} color="white" />
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </Animated.View>}
        </SafeAreaView>
      </TouchableWithoutFeedback>

<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHanlder} colors={['red', 'green', 'blue', 'black', 'orange']} />} >
      {/* // bottom  box */}
      {!isFullScreen && <>
      <View style={{
        width: "auto", paddingVertical: 10,position:"relative",zIndex:10, borderBottomEndRadius: 15, borderBottomStartRadius: 15, paddingHorizontal: 15, backgroundColor: "white", shadowColor: "#a3a3a3",shadowOffset: {width: 0,height: 10,},shadowOpacity: 0.0,shadowRadius: 2.84,elevation: 5}}>
        <Text style={{ fontWeight: "700", fontSize: 16 }} numberOfLines={2}>{item && item.title}</Text>
        <View style={{ backgroundColor: "#f7f7f7", padding: 5, marginTop: 5, borderRadius: 4 }}>
          <Text style={{ fontWeight: "500", fontSize: 13, textAlign: "justify", color: "#626363" }} numberOfLines={2}>{item && item.description}</Text>

        </View>
        <ScrollView style={{ width: "auto", marginTop: 20 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ width: "auto", display: "flex", gap: 22, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={() => item && navigation.navigate("Comments",item.comment)} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons name="comment-text-multiple" size={20} color="#616190" style={{ backgroundColor: "white", shadowColor: "#000", shadowOffset: { width: 10, height: 10 } }} />
              <Text style={{ fontWeight: "500", fontSize: 12 }}>Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MaterialCommunityIcons name="note-edit" size={20} color="#616190" style={{ backgroundColor: "white", shadowColor: "#000", shadowOffset: { width: 10, height: 10 } }} />
              <Text style={{ fontWeight: "500", fontSize: 12 }}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AntDesign name="questioncircleo" size={20} color="#616190" style={{ backgroundColor: "white", shadowColor: "#000", shadowOffset: { width: 10, height: 10 } }} />
              <Text style={{ fontWeight: "500", fontSize: 12 }}>My Question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="access-time" size={20} color="#616190" style={{ backgroundColor: "white", shadowColor: "#000", shadowOffset: { width: 10, height: 10 } }} />
              <Text style={{ fontWeight: "500", fontSize: 12 }}>Timeline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="download" size={20} color="#616190" style={{ backgroundColor: "white", shadowColor: "#000", shadowOffset: { width: 10, height: 10 } }} />
              <Text style={{ fontWeight: "500", fontSize: 12 }}>Download</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ width: "auto", paddingVertical: 10, backgroundColor: "white" }}>
          <View style={{ width: "auto", paddingVertical: 6, display: "flex", paddingHorizontal: 10, backgroundColor: "#f7f7f7", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
            <TextInput style={{ width: "90%", fontSize: 14 }} onChangeText={setComment} value={comment} placeholder='Add Comment' multiline={true} />
            <TouchableOpacity onPress={commentHandler}>
              <Ionicons name="send" size={24} color="#34a1fa" />
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <View style={{paddingHorizontal:15,backgroundColor:"#fff",marginBottom:300}}>
        {item && item.comment.length > 0 ? item.comment.map(comment=>(
          <CommentCard key={comment._id} comment={comment} setToast={setToast}/>
        )).reverse() : <Text style={{fontWeight:"600",fontSize:20,textAlign:"center",marginTop:"35%"}}>No Comment 👇!</Text> }
      </View>
      </>}

</ScrollView>
    </View>
  )
}

export default ViewVideo
