import {Pressable, StyleSheet, Text} from 'react-native';
import {useState} from 'react';
import type * as React from 'react';

export type BtnType = {
  action: () => void,
  children: React.ReactNode
}

export function Btn(props: BtnType) {
  const [hover, setHover] = useState(false);

  return <Pressable
    onPressIn={() => setHover(true)}
    onPressOut={() => setHover(false)}
    onPress={props.action}
    style={[styles.button, hover && styles.buttonHover]}
  >
    {props.children}
  </Pressable>
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
  text: {
    color: "#fff",
  },
});