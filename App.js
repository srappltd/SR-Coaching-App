import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import MenuConext from './context/MenuConext';
import HomeScreen from './screens/HomeScreen';
import MenuBtn from './screens/conponent/MenuBtn';
import LoginScreen from './screens/LoginScreen';
import ViewVideo from './screens/ViewVideo';
import CommentScreen from './screens/CommentScreen';
import { useEffect } from 'react';
import LogoutBtn from './screens/conponent/LogoutBtn';
import { store } from './store/store';
import { StatusBar } from 'expo-status-bar';
import { asyncInit } from './store/actions/authToken';
import PlaylistVIdeos from './screens/PlaylistVIdeos';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator()

const MyStack = () => {
  const {authToken,client} = useSelector(state=>state.authReducer)
  return (
    <>
      <StatusBar />
    <Stack.Navigator initialRouteName='Home'>
      {<Stack.Screen name='Home' options={{headerTitle:`hello 👋 ${client && client.firstname }`,headerRight:()=>(<LogoutBtn/>),headerLeft:()=>(MenuBtn())}} component={HomeScreen} />}
        <Stack.Screen name='Playlist' component={PlaylistVIdeos}/>
        <Stack.Screen name='Play' options={{headerTitle:"",headerShown:false}} component={ViewVideo}/>
        <Stack.Screen name='Comments' component={CommentScreen}/>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{headerTitle:"My Profile",headerTitleAlign:"center"}} />
    </Stack.Navigator>
    </>
  );
}

const AuthStack = () => {
  return (
    <>
    <Stack.Navigator>
              <Stack.Screen name='Login' options={{headerShown:false}} component={LoginScreen}/>
    </Stack.Navigator>
    </>
  )
}


const RootNavigation = () => {
  const {authToken,client} = useSelector(state=>state.authReducer)
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(asyncInit());
  }
  useEffect(() => {
    init()
  }, [])

  // console.log(client)

  return (
    <NavigationContainer>
      {
        authToken === null ?
          <AuthStack /> : <MyStack />
      }
    </NavigationContainer>
  )
}







export default function App() {
  return (
    <Provider store={store}>
    <MenuConext>
    <RootNavigation/>
    </MenuConext>
    </Provider>
  );
}
