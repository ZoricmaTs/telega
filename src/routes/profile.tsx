import {Text, View} from 'react-native';
import {useUserStore} from '../stores/user.ts';

export function Profile() {
  const { user, setUser, clearUser } = useUserStore();

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
      </>
    )}
  </View>;
}