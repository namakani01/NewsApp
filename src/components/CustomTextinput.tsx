import {TextInput} from 'react-native';
import React from 'react';

type TextInputProps = {
  style: object;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
};

const CustomTextinput = (props: TextInputProps) => {
  return (
    <TextInput
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      style={[props.style]}
      onChangeText={props.onChangeText}></TextInput>
  );
};

export default CustomTextinput;
