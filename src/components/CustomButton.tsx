import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';

type ButtonProps = {
  style?: object;
  onPress?: () => void;
  children?: React.ReactNode;
  children1?: ReactNode;
};

const CustomButton = (props: ButtonProps) => {
  return (
    <TouchableOpacity style={[props.style]} onPress={props.onPress}>
      {props.children}
      {props.children1}
    </TouchableOpacity>
  );
};

export default CustomButton;
