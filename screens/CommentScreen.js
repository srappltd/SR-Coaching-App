import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import CommentCard from './conponent/CommentCard'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

const CommentScreen = () => {
  const {params} = useRoute(null)
  const [toast,setToast] = useState('')
  const dispatch = useDispatch(null)
  const [commentArr,setCommentArr] = useState(params)
  useEffect(()=>{
    setCommentArr(params)
  },[toast])
  return (
    <View style={{paddingHorizontal:15,width:"auto",paddingVertical:10}}>
      {commentArr && commentArr.length > 0 ? commentArr.map(comment=>(
          <CommentCard key={comment._id} comment={comment} setToast={setToast}/>
        )).reverse() : <Text style={{fontWeight:"600",fontSize:20,textAlign:"center",marginTop:"100%"}}>No Comment 👇!</Text> }
    </View>
  )
}

export default CommentScreen
