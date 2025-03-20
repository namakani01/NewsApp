import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Homescreen/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Bookmark from 'react-native-vector-icons/Ionicons';
import Saved from '../screens/Splashscreen/Saved';
import {BottomTabParamList} from './Navigationtypes';
import Settingscreen from '../screens/Settingscreen/Settingscreen';
import Setting from 'react-native-vector-icons/AntDesign';
import Discover from '../screens/Homescreen/Discover';
import {horizontalScale, moderateScale, verticalScale} from '../styles/Metrics';
import {useTheme} from '../Themes/ThemeContext';

const BottomTab = () => {
  const {isDarkMode, toggleTheme} = useTheme();
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: isDarkMode ? 'black' : 'white'},
      }}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View>
                <Icon
                  name="home-outline"
                  color="#FF4C4C"
                  size={moderateScale(23)}
                />
                <View
                  style={{
                    height: verticalScale(6),
                    width: horizontalScale(23),
                    backgroundColor: '#FF4C4C',
                    justifyContent: 'center',
                    marginTop: verticalScale(5),
                  }}></View>
              </View>
            ) : (
              <Icon
                name="home-outline"
                color={isDarkMode ? 'white' : '#687076'}
                size={moderateScale(23)}
              />
            );
          },
          tabBarIconStyle: {marginTop: verticalScale(5)},
        }}
        name="Home"
        component={Home}></Tab.Screen>

      <Tab.Screen
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: isDarkMode ? 'black' : 'white'},
          headerTitleStyle: {color: isDarkMode ? 'white' : 'black'},
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View>
                <Icon
                  name="compass-outline"
                  color="#FF4C4C"
                  size={moderateScale(24)}
                />
                <View
                  style={{
                    height: verticalScale(6),
                    width: horizontalScale(23),
                    backgroundColor: '#FF4C4C',
                    justifyContent: 'center',
                    marginTop: verticalScale(5),
                  }}></View>
              </View>
            ) : (
              <Icon
                name="compass-outline"
                color={isDarkMode ? 'white' : '#687076'}
                size={moderateScale(24)}
              />
            );
          },
          tabBarIconStyle: {
            marginTop: verticalScale(5),
          },
        }}
        name="Discover"
        component={Discover}></Tab.Screen>

      <Tab.Screen
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: isDarkMode ? 'black' : 'white'},
          headerTitleStyle: {color: isDarkMode ? 'white' : 'black'},
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View>
                <Bookmark
                  name="bookmarks-outline"
                  color="#FF4C4C"
                  size={moderateScale(22)}
                />
                <View
                  style={{
                    height: verticalScale(6),
                    width: horizontalScale(23),
                    backgroundColor: '#FF4C4C',
                    justifyContent: 'center',
                    marginTop: verticalScale(5),
                  }}></View>
              </View>
            ) : (
              <Bookmark
                name="bookmarks-outline"
                color={isDarkMode ? 'white' : '#687076'}
                size={moderateScale(22)}
              />
            );
          },
          tabBarIconStyle: {marginTop: verticalScale(5)},
        }}
        name="Saved"
        component={Saved}></Tab.Screen>

      <Tab.Screen
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: isDarkMode ? 'black' : 'white'},
          headerTitleStyle: {color: isDarkMode ? 'white' : 'black'},
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View>
                <Setting
                  name="setting"
                  color="#FF4C4C"
                  size={moderateScale(23)}
                />
                <View
                  style={{
                    height: verticalScale(6),
                    width: horizontalScale(23),
                    backgroundColor: '#FF4C4C',
                    justifyContent: 'center',
                    marginTop: verticalScale(5),
                  }}></View>
              </View>
            ) : (
              <Setting
                name="setting"
                color={isDarkMode ? 'white' : '#687076'}
                size={moderateScale(23)}
              />
            );
          },
          tabBarIconStyle: {marginTop: verticalScale(5)},
        }}
        name="Settings"
        component={Settingscreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTab;
