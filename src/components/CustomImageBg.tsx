import {ImageBackground, View} from 'react-native';
import React from 'react';

type BackgroundImageProps = {
  style: object;
  source: any;
  children: React.ReactNode;
  // imageStyle: any;
};

const CustomImageBg = (props: BackgroundImageProps) => {
  return (
    <ImageBackground
      // imageStyle={props.imageStyle}
      style={[props.style]}
      source={props.source}>
      {props.children}
    </ImageBackground>
  );
};

export default CustomImageBg;
