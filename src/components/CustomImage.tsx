import {Image, View} from 'react-native';
import React from 'react';

type ImageProps = {
  source: any;
  style?: object;
};

const CustomImage = (props: ImageProps) => {
  return <Image style={[props.style]} source={props.source}></Image>;
};

export default CustomImage;
