import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './Navigationtypes';
import Splash from '../screens/Splashscreen/Splash';
import BottomTab from './BottomTab';
import NewsDetails from '../screens/Homescreen/NewsDetails/NewsDetails';
import Heart from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/CustomButton';
import Backarrow from 'react-native-vector-icons/Ionicons';
import Searchscreen from '../screens/Searchscreen/Searchscreen';
import {useNavigation} from '@react-navigation/native';
import {horizontalScale, moderateScale, verticalScale} from '../styles/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<RootStackParamList>();
const StackNavigation = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkUser = async () => {
      const firstTime = await AsyncStorage.getItem('firstTime');
      if (firstTime !== null) {
        navigation.navigate('BottomTab');
      } else {
        navigation.navigate('Splash');
      }
    };
    checkUser();
  }, []);

  const [like, setLike] = useState<boolean>(false);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>

      <Stack.Screen
        // options={{
        //   headerShown: true,
        //   headerLeft: () => (
        //     <CustomButton
        //       onPress={() => navigation.goBack()}
        //       style={{
        //         height: verticalScale(26),
        //         width: horizontalScale(25),
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}>
        //       <Backarrow
        //         name="arrow-back"
        //         size={moderateScale(21.5)}></Backarrow>
        //     </CustomButton>
        //   ),
        //   headerRight: () => (
        //     <CustomButton
        //       onPress={() => {
        //         setLike(!like);
        //       }}
        //       style={{
        //         height: verticalScale(26),
        //         width: horizontalScale(25),
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}>
        //       {like ? (
        //         <Heart name="heart" size={moderateScale(19)} color={'red'} />
        //       ) : (
        //         <Heart name="hearto" size={moderateScale(19)} />
        //       )}
        //     </CustomButton>
        //   ),
        //   title: '',
        // }}
        options={{
          headerShown: false,
        }}
        name="NewsDetails"
        component={NewsDetails}></Stack.Screen>

      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => (
            <CustomButton
              onPress={() => navigation.goBack()}
              style={{
                height: verticalScale(26),
                width: horizontalScale(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Backarrow
                name="arrow-back"
                size={moderateScale(21.5)}></Backarrow>
            </CustomButton>
          ),
        }}
        name="Search"
        component={Searchscreen}></Stack.Screen>
      <Stack.Screen name="BottomTab" component={BottomTab}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
