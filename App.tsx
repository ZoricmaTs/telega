/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StyleSheet} from 'react-native';
import TdLib, {TdLibParameters} from 'react-native-tdlib';
import Config from "react-native-config";
import {Login} from './src/routes/login.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/routes/home.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {Profile} from './src/routes/profile.tsx';
import {useUserStore} from './src/stores/user.ts';

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

function App() {
  const parameters = {
    api_id: Number(Config.API_ID), // Your API ID
    api_hash: Config.API_HASH, // Your API Hash
  } as TdLibParameters;
  const { user, hydrated } = useUserStore();

  if (!hydrated) {
    // 👇 пока данные ещё грузятся — показываем сплэш / лоадер
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
  return <></>; // сюда можно загрузочный экран
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 8,
  },
  title: {fontSize: 18, alignSelf: 'center', marginBottom: 10},
  input: {padding: 6, borderRadius: 10, borderWidth: 1, height: 40},
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginVertical: 14,
  },
});

export default App;
