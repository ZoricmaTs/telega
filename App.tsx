/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View} from 'react-native';
import TdLib, {TdLibParameters} from 'react-native-tdlib';
import Config from "react-native-config";
import {Login} from './src/routes/login.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/routes/home.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {Profile} from './src/routes/profile.tsx';
import {useUserStore} from './src/stores/user.ts';
import {useEffect, useState} from 'react';

type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  Profile: undefined,
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const params = {
  api_id: Number(Config.API_ID), // Your API ID
  api_hash: Config.API_HASH, // Your API Hash
} as TdLibParameters;

function App() {
  const { user, hydrated } = useUserStore();
  const [isTdLibInited, setTdLibInited] = useState(false);

  useEffect(() => {
    TdLib.startTdLib(params).then(r => {
      setTdLibInited(true);
    }).catch((err) => {
      console.log('TdLib initialization failed', err)
    });
  }, []);

  if (!hydrated || !isTdLibInited) {
    return <SplashScreen />;
  }

  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user === null ? "Home" : "Profile"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SplashScreen() {
  return <View></View>;
}

export default App;
