import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomFlatlist from '../../components/CustomFlatlist';
import CustomButton from '../../components/CustomButton';
import CustomImage from '../../components/CustomImage';
import CustomText from '../../components/CustomText';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../Themes/ThemeContext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles/Metrics';

const Saved = () => {
  const {isDarkMode, toggleTheme} = useTheme();
  const navigation = useNavigation<any>();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('savedNews');
      if (storedData) {
        setSaved(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error fetching saved news:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSavedData();
    }, []),
  );

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: isDarkMode ? 'black' : 'white'}}>
      {saved.length > 0 ? (
        <CustomFlatlist
          style={{
            marginTop: verticalScale(7),
          }}
          data={saved}
          renderItem={({item}) => (
            <CustomButton
              onPress={() => navigation.navigate('NewsDetails', {item: item})}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: verticalScale(12),
              }}>
              <CustomImage
                style={{
                  height: verticalScale(100),
                  width: horizontalScale(90),
                  borderRadius: moderateScale(10),
                  marginRight: horizontalScale(12),
                }}
                source={{uri: item.image_url}}></CustomImage>

              <View style={{gap: 12, width: '70%'}}>
                <CustomText
                  text={item.category}
                  style={{
                    fontSize: moderateScale(13),
                    textTransform: 'capitalize',
                    color: isDarkMode ? 'white' : 'black',
                  }}></CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(13),
                    color: isDarkMode ? 'white' : 'black',
                  }}
                  text={item.title}></CustomText>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                  <CustomImage
                    style={{
                      height: verticalScale(18),
                      width: horizontalScale(18),
                      borderRadius: moderateScale(10),
                    }}
                    source={{uri: item.source_icon}}></CustomImage>
                  <CustomText
                    text={item.source_name}
                    style={{
                      color: isDarkMode ? 'white' : 'black',
                    }}></CustomText>
                </View>
              </View>
            </CustomButton>
          )}></CustomFlatlist>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CustomText
            text="No Saved Data Found"
            style={{
              fontSize: moderateScale(17),
              color: isDarkMode ? 'white' : 'black',
            }}></CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Saved;
