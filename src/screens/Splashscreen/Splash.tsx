import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import CustomImageBg from '../../components/CustomImageBg';
import CustomButton from '../../components/CustomButton';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles/Metrics';

import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Navigationtypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const Splash = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <CustomImageBg
        style={styles.bgstyle}
        source={require('/Users/neo/Desktop/Project/NewsApp1/src/assest/images/getting-started.jpg')}>
        <View style={styles.bgcontainer}>
          <CustomText
            style={styles.stayupdatedtext}
            text="Stay Updated!"></CustomText>

          <CustomText
            style={styles.slogantext}
            text="Get breaking news and personalized updates directly to your feed"></CustomText>

          <CustomButton
            onPress={() => navigation.navigate('BottomTab')}
            style={styles.buttoncontainer}>
            <CustomText
              style={styles.buttontext}
              text="Get Started"></CustomText>
          </CustomButton>
        </View>
      </CustomImageBg>
    </View>
  );
};

const styles = StyleSheet.create({
  bgstyle: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  bgcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: verticalScale(80),
    paddingHorizontal: horizontalScale(30),
    gap: verticalScale(10),
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  stayupdatedtext: {
    color: 'white',
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 1.5,
  },

  slogantext: {
    color: 'white',
    fontSize: moderateScale(14),
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 1.2,
  },

  buttoncontainer: {
    backgroundColor: '#FF4C4C',
    marginHorizontal: horizontalScale(40),
    marginVertical: verticalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(9),
  },

  buttontext: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
});

export default Splash;
