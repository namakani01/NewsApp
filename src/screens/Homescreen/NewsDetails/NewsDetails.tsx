import {View, SafeAreaView, ScrollView, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../../components/CustomText';
import CustomImage from '../../../components/CustomImage';
import Backarrow from 'react-native-vector-icons/Ionicons';
import Heart from 'react-native-vector-icons/AntDesign';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/Metrics';
import moment from 'moment';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsDetails = (props: any) => {
  const navigation = useNavigation();
  const [news, setNews] = useState(props.route.params.item);

  [];
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const storedData = await AsyncStorage.getItem('savedNews');
        if (storedData) {
          const savedNews = JSON.parse(storedData);
          const isAlreadySaved = savedNews.some(
            (item: {article_id: string}) => item.article_id === news.article_id,
          );
          setLike(isAlreadySaved);
        }
      } catch (error) {
        console.error('Error checking saved news:', error);
      }
    };

    checkIfSaved();
  }, [news]);

  const storeData = async (newsItem: any) => {
    setLike(true);
    try {
      const existingData = await AsyncStorage.getItem('savedNews');
      let savedNews = existingData ? JSON.parse(existingData) : [];

      if (!Array.isArray(savedNews)) {
        savedNews = [];
      }

      const isAlreadySaved = savedNews.some(
        (item: {article_id: string}) => item.article_id === newsItem.article_id,
      );

      if (!isAlreadySaved) {
        savedNews.push(newsItem);
        await AsyncStorage.setItem('savedNews', JSON.stringify(savedNews));
        Alert.alert('Success', 'News saved successfully');
      }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const removeNews = async (news: any) => {
    setLike(false);
    try {
      const existingData = await AsyncStorage.getItem('savedNews');
      let savedNews = existingData ? JSON.parse(existingData) : [];

      const updatedNews = savedNews.filter(
        (item: {article_id: any}) => item.article_id !== news.article_id,
      );

      await AsyncStorage.setItem('savedNews', JSON.stringify(updatedNews));

      Alert.alert('Removed', 'News has been removed');
    } catch (error) {
      console.error('Error removing news:', error);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaViewcontainer}>
      <View style={styles.header}>
        <CustomButton
          onPress={() => {
            navigation.goBack();
          }}>
          <Backarrow name="arrow-back" size={moderateScale(21)}></Backarrow>
        </CustomButton>

        <CustomButton
          onPress={() => (like ? removeNews(news) : storeData(news))}>
          <Heart
            name={like ? 'heart' : 'hearto'}
            color={like ? 'red' : 'black'}
            size={moderateScale(19.5)}
          />
        </CustomButton>
      </View>
      <ScrollView style={styles.ScrollViewConatiner}>
        <View style={styles.container}>
          <CustomText style={styles.title} text={news.title} />

          <View style={styles.DateandSourcenameContainer}>
            <CustomText
              style={styles.Date}
              text={moment(news.pubDate).format(
                'MMMM DD, hh:mm a',
              )}></CustomText>
            <CustomText
              style={styles.source_name}
              text={news.source_name}></CustomText>
          </View>

          <CustomImage
            style={styles.image}
            source={{uri: news.image_url}}></CustomImage>

          <CustomText
            style={styles.description}
            text={news.description}></CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaViewcontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewConatiner: {
    marginBottom: verticalScale(20),
  },
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(17),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(13),
    marginHorizontal: horizontalScale(13),
  },
  title: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    fontSize: moderateScale(14),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  DateandSourcenameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  Date: {
    color: '#6d6e6d',
    fontWeight: '600',
  },
  source_name: {
    color: '#6d6e6d',
    fontWeight: '600',
  },
  image: {
    height: verticalScale(230),
    width: '100%',
    borderRadius: moderateScale(17),
    marginBottom: verticalScale(20),
  },
  description: {
    fontSize: 14.5,
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});

export default NewsDetails;
