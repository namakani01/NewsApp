import {SafeAreaView, Switch, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Right from 'react-native-vector-icons/AntDesign';
import Logout from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, verticalScale} from '../../styles/Metrics';
import {useTheme} from '../../Themes/ThemeContext';
const Settingscreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {isDarkMode, toggleTheme} = useTheme();

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: isDarkMode ? 'black' : 'white'}}>
      <CustomButton
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: verticalScale(18),
        }}>
        <CustomText
          text="About"
          style={{
            fontSize: moderateScale(16),
            color: isDarkMode ? 'white' : 'black',
          }}></CustomText>
        <Right
          name="right"
          size={moderateScale(19)}
          color={isDarkMode ? 'white' : 'black'}></Right>
      </CustomButton>

      <CustomButton
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: verticalScale(18),
        }}>
        <CustomText
          text="Send Feedback"
          style={{
            fontSize: moderateScale(16),
            color: isDarkMode ? 'white' : 'black',
          }}></CustomText>
        <Right
          name="right"
          size={moderateScale(19)}
          color={isDarkMode ? 'white' : 'black'}></Right>
      </CustomButton>

      <CustomButton
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: verticalScale(18),
        }}>
        <CustomText
          text="Privacy Policy"
          style={{
            fontSize: moderateScale(16),
            color: isDarkMode ? 'white' : 'black',
          }}></CustomText>
        <Right
          name="right"
          size={moderateScale(19)}
          color={isDarkMode ? 'white' : 'black'}></Right>
      </CustomButton>

      <CustomButton
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: verticalScale(18),
        }}>
        <CustomText
          text="Terms of Use"
          style={{
            fontSize: moderateScale(16),
            color: isDarkMode ? 'white' : 'black',
          }}></CustomText>
        <Right
          name="right"
          size={moderateScale(19)}
          color={isDarkMode ? 'white' : 'black'}></Right>
      </CustomButton>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: verticalScale(18),
        }}>
        <CustomText
          text="Dark Mode"
          style={{
            fontSize: moderateScale(16),
            color: isDarkMode ? 'white' : 'black',
          }}></CustomText>
        <Switch
          trackColor={{false: '#767577', true: '#767577'}}
          thumbColor={isEnabled ? '#FF4C4C' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>

      <CustomButton
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: verticalScale(18),
        }}>
        <CustomText
          text="Logout"
          style={{
            fontSize: moderateScale(16),
            color: isDarkMode ? 'white' : 'black',
          }}></CustomText>
        <Logout
          name="logout"
          size={moderateScale(21)}
          color={isDarkMode ? 'white' : 'black'}
        />
      </CustomButton>
    </SafeAreaView>
  );
};

export default Settingscreen;
