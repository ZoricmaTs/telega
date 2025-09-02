import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Btn} from '../../widgets/Button.tsx';

export function Home() {
  const navigation = useNavigation();

  return <View style={{width: '100%', height: '100%', backgroundColor: 'pink'}}>
    <Text>{'HOME'}</Text>
    <Btn action={() => navigation.navigate('Login')}>
      <Text style={{color: "#ffffff"}}>{'go LOG IN'}</Text>
    </Btn>
  </View>
}