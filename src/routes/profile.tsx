import {Text, View} from 'react-native';
import {useUserStore} from '../stores/user.ts';
import {Btn} from '../../widgets/Button.tsx';
import TdLib from 'react-native-tdlib';
import {useNavigation} from '@react-navigation/core';

export function Profile() {
  const {user, clearUser} = useUserStore();
  const navigation = useNavigation();

  return <View style={{width: '100%', height: '100%', backgroundColor: 'green'}}>
    {user && (
      <>
        <Text>
          Name: {user.first_name || user.firstName}{' '}
          {user.last_name || user.lastName}
        </Text>
        <Text>
          Phone Number: {user.phone_number || user.phoneNumber}
        </Text>
        <Btn action={() => {
          TdLib.logout().then((res) => {
            TdLib.getAuthorizationState().then((res) => {
              if (JSON.parse(res)['@type'] === 'authorizationStateLoggingOut') {
                clearUser();
                navigation.navigate('Login');
              }
            })
          }, (err) =>{
            console.log('logout error', err)
          });
        }}>
          <Text>{'Logout'}</Text>
        </Btn>
      </>
    )}
  </View>;
}