import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { baseURL2 } from '../../utils/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { asyncCommentDelete } from '../../store/actions/authToken'

const CommentCard = ({comment,setToast}) => {
  const {_id,client,createdAt} = comment
  const dispatch = useDispatch(null)
  const clientid = useSelector(state=>state.authReducer.client)
  // console.log(client)
  const commentDeleteHandler = (commentid,userid)=>{
    try {
      if(userid == clientid._id){
        dispatch(asyncCommentDelete(commentid,setToast))
        console.log(commentid,userid)
      }
    } catch (error) {
      
    }
  }
  return (
    <TouchableOpacity onLongPress={()=>(clientid._id == client._id) && commentDeleteHandler(_id,client._id)} activeOpacity={.8}>
      <View style={{width:"auto",paddingVertical:5, borderBottomWidth:1,borderColor:"rgba(214, 214, 214, 0.47)"}}>
              <View style={{width:"auto",display:"flex",flexDirection:"row",gap:5,alignItems:"center"}}>
                <Image source={{uri: client && client.picture ? baseURL2+client.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwfzTPVw45cJcHNUp3sWUWLOkYAfQlAEBOQ&s' }} style={{width:20,height:20,borderRadius:100,overflow:"hidden",objectFit:"cover"}}/>
                <Text style={{fontSize:12,fontWeight:"500"}}>{(clientid._id == client._id) ? 'You' : client.firstname + ' ' + client.lastname}</Text>
                <Text style={{fontSize:10,fontWeight:"500",color:'#7d7d7d'}}>{moment.utc(createdAt).local().startOf('seconds').fromNow()}</Text>
                
                {(clientid._id == client._id) &&
                <TouchableOpacity onPress={()=>(clientid._id == client._id) && commentDeleteHandler(_id,client._id)} style={{marginLeft:"auto"}} activeOpacity={.8}>
                  <MaterialIcons name='delete' size={20}/>
                </TouchableOpacity>
                }
              </View>
              <Text style={{fontSize:13,color:'#4a4a4a',marginTop:5}}>{comment.comment}</Text>
              <View style={{width:"auto",display:"flex",marginTop:8,flexDirection:"row",gap:5,alignItems:"center"}}>
                <View style={{display:"flex",flexDirection:"row",alignItems:"center",gap:5}}>
                  <TouchableOpacity>
                    <AntDesign name="hearto" size={15} color="black" />
                  </TouchableOpacity>
                <Text style={{fontSize:12,fontWeight:"600"}}>Like</Text>
                </View>
              </View>
            </View>

    </TouchableOpacity>
  )
}

export default CommentCard
