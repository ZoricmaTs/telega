import {Text, View} from 'react-native';
import {useCallback, useState} from 'react';
import TdLib, {TdLibParameters} from 'react-native-tdlib';
import {Input, InputProps} from '../widgets/input';
import {useNavigation} from '@react-navigation/core';
import {Btn} from '../../widgets/Button.tsx';
import Config from 'react-native-config';

export function Login() {
  const navigation = useNavigation();
  const parameters = {
    api_id: Number(Config.API_ID), // Your API ID
    api_hash: Config.API_HASH, // Your API Hash
  } as TdLibParameters;

  const [inputs, setInputs]  = useState<InputProps[]>([{
    id: 'login_country-code',
    value: '',
    placeholder: '+7',
    label: 'country code',
    onChange: (value) => {},
  },
    {
      id: 'login_phone',
      value: '',
      placeholder: '1234567890',
      label: 'phone number',
      onChange: (value) => {},
    }]);

  const onChange = (value: string, index: number) => {
    const data = inputs[index];
    const copy = [...inputs];
    inputs[index] = {
      ...data,
      value: value,
    };

    data.onChange(value);
    setInputs(copy);
    console.log('onChange value index', value, index)
  }

  const sendCode = useCallback(() => {
    console.log('useCallback sendCode')

    return TdLib.login({countrycode: inputs[0].value as string, phoneNumber: inputs[1].value as string}).then(r =>
      console.log('SendCode:', r),
    ).then(() => {
      navigation.navigate('SendCode');
    });
  }, []);

  return <View>
    <Text>Authorization</Text>
    {inputs.map((input, index: number) => {
      return <Input id={input.id} placeholder={input.placeholder} value={input.value} onChange={(value) => onChange(value, index)} key={input.id}/>
    })}
    <Btn action={sendCode}>
      <Text style={{color: "#ffffff"}}>{'Send code'}</Text>
    </Btn>
  </View>
}