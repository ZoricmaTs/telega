import {Text, TextInput, View} from 'react-native';
import {useState} from 'react';

export type InputProps = {
  value?: string,
  label?: string,
  id: string,
  placeholder: string,
  onChange: (value: string) => void
}
export function Input(props: InputProps) {
  const [text, setText] = useState(props.value ? props.value : '');
  const onChangeText = (value: string) => {
    setText(value);
    props.onChange(value);
  }

  return <View>
    <Text>{props.label}</Text>
    <TextInput
    value={text}
    onChangeText={onChangeText}
    placeholder={props.placeholder}
    placeholderTextColor={'gray'}
    style={{
      padding: 6,
      borderRadius: 10,
      borderWidth: 1,
      height: 40,
      marginVertical: 14,
    }}
  />
  </View>
}