import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './Navigationtypes';
import Splash from '../screens/Splashscreen/Splash';
import BottomTab from './BottomTab';
import NewsDetails from '../screens/Homescreen/NewsDetails/NewsDetails';
import CustomButton from '../components/CustomButton';
import Backarrow from 'react-native-vector-icons/Ionicons';
import Searchscreen from '../screens/Searchscreen/Searchscreen';
import {useNavigation} from '@react-navigation/native';
import {horizontalScale, moderateScale, verticalScale} from '../styles/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {View} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const StackNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirstLaunch');
        setIsFirstLaunch(value === null);
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#FF4C4C" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'Splash' : 'BottomTab'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="NewsDetails"
        component={NewsDetails}></Stack.Screen>

      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
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
