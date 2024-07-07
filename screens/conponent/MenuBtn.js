import React, { useContext } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { MenuLeftContext } from '../../context/MenuConext'
import { useSelector } from 'react-redux'
import { baseURL2 } from '../../utils/Axios'
import { useNavigation } from '@react-navigation/native'

const MenuBtn = () => {
    const {drawerRef,setIsFullScreen} = useContext(MenuLeftContext)
    const {client} = useSelector(state=>state.authReducer)
    const navigate = useNavigation(null)
  return (
    <TouchableOpacity onPress={()=>navigate.navigate('Profile')} style={{width:27,height:27,backgroundColor:"red",marginLeft:10,borderRadius:100,overflow:"hidden"}}>
        <Image source={{uri: client && client.picture ? baseURL2+client.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwfzTPVw45cJcHNUp3sWUWLOkYAfQlAEBOQ&s'  }} style={{width:'100%',height:"100%",objectFit:"cover"}} />
    </TouchableOpacity>
  )
}

export default MenuBtn
