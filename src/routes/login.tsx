import {Modal, Platform, StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import TdLib, {TdLibParameters} from 'react-native-tdlib';
import {Input, InputProps} from '../widgets/input';
import {useNavigation} from '@react-navigation/core';
import {Btn} from '../../widgets/Button.tsx';
import Config from 'react-native-config';

export function Login() {
  const navigation = useNavigation();
  const params = {
    api_id: Number(Config.API_ID), // Your API ID
    api_hash: Config.API_HASH, // Your API Hash
  } as TdLibParameters;

  const [countrycode, setCountrycode] = useState<string>('');
  const [phoneNumber, setPhoneNumber]  = useState<string>('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Initializes TDLib with the provided parameters and checks the authorization state
    console.log('useEffect:');
    TdLib.startTdLib(params).then(r => {
      console.log('StartTdLib:', r);
      TdLib.getAuthorizationState().then(r => {
        console.log('InitialAuthState:', r);
        if (JSON.parse(r)['@type'] === 'authorizationStateReady') {
          getProfile(); // Fetches the user's profile if authorization is ready
        }
      });
    }).catch((err) => {
      console.log('err', err)});
  }, []);

  const sendCode = useCallback(() => {
    return TdLib.login({countrycode, phoneNumber})
      .then(r => {
        setModalVisible(true);
      }, (err: any) => {
        console.log('err TdLib', err);
      });
    }, [countrycode, phoneNumber]);

  const verifyPhoneNumber = useCallback(() => {
    TdLib.verifyPhoneNumber(otp).then(r => {
      setModalVisible(!modalVisible);
      setModalPasswordVisible(true);
        console.log('VerifyPhoneNumber:', r);
    });
  }, [otp]);

  const checkPassword = useCallback(() => {
    TdLib.verifyPassword(password).then(r => {
      setModalPasswordVisible(!modalPasswordVisible)
    });
  }, [password]);

  const getProfile = useCallback(() => {
    TdLib.getProfile().then(result => {
      console.log('User Profile:', result);
      const profile = Platform.select({
        ios: result,
        android: JSON.parse(result),
      });
      setProfile(profile);
    });
  }, []);

  const checkAuthState = useCallback(() => {
    TdLib.getAuthorizationState().then(r => console.log('AuthState:', r));
  }, []);

  return <View>
    <Input id={'login_country-code'} placeholder={'+7'} value={countrycode} onChange={(value) => setCountrycode(value)} label={'country code'}/>
    <Input id={'login_phone'} placeholder={'1234567890'} value={phoneNumber} onChange={(value) => setPhoneNumber(value)} label={'phone number'}/>
    <Btn action={sendCode}>
      <Text style={{color: "#ffffff"}}>{'Send code'}</Text>
    </Btn>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>OTP code</Text>
          <Input id={'otp'} placeholder={'1234'} value={otp} onChange={(value) => setOtp(value)} label={'verify phone number'}/>
          <Btn
            action={verifyPhoneNumber}>
            <Text style={{color: "#ffffff"}}>{'Login'}</Text>
          </Btn>
        </View>
      </View>
    </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPasswordVisible}
      onRequestClose={() => {
        setModalPasswordVisible(!modalPasswordVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Password (optional)</Text>
          <Input id={'otp'} placeholder={'123456'} value={password} onChange={(value) => setPassword(value)} label={'verify password'}/>
          <Btn
            action={checkPassword}>
            <Text style={{color: "#ffffff"}}>{'checked password'}</Text>
          </Btn>
        </View>
      </View>
    </Modal>

    {profile && (
      <>
        <Text>
          Name: {profile.first_name || profile.firstName}{' '}
          {profile.last_name || profile.lastName}
        </Text>
        <Text>
          Phone Number: {profile.phone_number || profile.phoneNumber}
        </Text>
      </>
    )}

    <Btn action={getProfile}>
      <Text style={{color: "#ffffff"}}>{'Get Profile'}</Text>
    </Btn>

    <Btn action={checkAuthState}>
      <Text style={{color: "#ffffff"}}>{'Get Auth State'}</Text>
    </Btn>

  </View>
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});