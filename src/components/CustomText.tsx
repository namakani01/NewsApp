import {Text, View} from 'react-native';
import React from 'react';

type CustomTextProps = {
  text: string;
  style?: object;
};

const CustomText = (props: CustomTextProps) => {
  return <Text style={[props.style]}>{props.text}</Text>;
};

export default CustomText;
