import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomImage from '../../components/CustomImage';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import CustomTextinput from '../../components/CustomTextinput';
import CustomFlatlist from '../../components/CustomFlatlist';
import SwiperFlatList from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import Bell from 'react-native-vector-icons/Ionicons';
import Search from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {NewsCatagories} from '../../DataSet/CategoriesData';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../Themes/ThemeContext';
import {API_KEY} from '@env';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles/Metrics';

const Home = () => {
  // console.log(API_KEY , ">>>")

  const {isDarkMode, toggleTheme} = useTheme();
  const [newsList, setNewsList] = useState([]);
  const [category, setCategory] = useState('top');

  const [activeIndex, setActiveIndex] = useState(0);
  const FlatlistRef = useRef<FlatList>(null);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  async function getNewsList() {
    try {
      let response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&size=10&removeduplicate=1&category=${category}`,
      );

      // console.log(response.data.results);
      setNewsList(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const scrollToCateogery = (index: number, title: string) => {
    FlatlistRef.current?.scrollToIndex({index, animated: true});
    setActiveIndex(index);

    if (title !== 'All') {
      setCategory(title);
    } else {
      setCategory('top');
    }
  };

  useEffect(() => {
    getNewsList();
  }, [category]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
      <View style={styles.firstContainer}>
        <View style={styles.containerforImageandText}>
          <CustomImage
            style={styles.userImage}
            source={{
              uri: 'https://xsgames.co/randomusers/avatar.php?g=male',
            }}></CustomImage>

          <View style={styles.userNameContainer}>
            <CustomText
              text="Welcome"
              style={{color: isDarkMode ? 'white' : 'black'}}
            />
            <CustomText
              style={[styles.userName, {color: isDarkMode ? 'white' : 'black'}]}
              text="John Doe!"
            />
          </View>
        </View>

        <CustomButton>
          <Bell
            name="notifications-outline"
            size={moderateScale(23)}
            color={isDarkMode ? 'white' : 'black'}></Bell>
        </CustomButton>
      </View>

      <View style={styles.Searchcontainer}>
        <Search
          name="search1"
          size={moderateScale(20)}
          style={styles.SearchIcon}></Search>
        <CustomTextinput
          placeholderTextColor="black"
          placeholder="Search"
          style={styles.Textinput}></CustomTextinput>
      </View>

      <CustomText
        text="Breaking News"
        style={[
          styles.BreakingNews,
          {color: isDarkMode ? 'white' : 'black'},
        ]}></CustomText>

      <View
        style={{
          flex: 0.467,
          // backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'red'}></ActivityIndicator>
        ) : (
          <SwiperFlatList
            style={
              {
                // backgroundColor: 'red',
                // width: '0%',
              }
            }
            data={newsList.slice(0, 5)}
            autoplay
            autoplayDelay={2}
            autoplayLoop
            showPagination
            paginationStyleItem={{
              height: verticalScale(6),
              width: horizontalScale(6),
              borderRadius: moderateScale(50),
            }}
            paginationActiveColor="red"
            renderItem={({item}) => (
              <CustomButton
                // style={{backgroundColor: 'red'}}
                onPress={() =>
                  navigation.navigate('NewsDetails', {item: item})
                }>
                <CustomImage
                  style={styles.CarosuelImage}
                  source={{uri: item.image_url}}></CustomImage>

                <LinearGradient
                  style={styles.LinearGradientConatiner}
                  colors={['transparent', 'rgba(0,0,0,0.7)']}>
                  <View style={styles.containerforSourceiconandSourceName}>
                    <CustomImage
                      style={styles.sourceicon}
                      source={{uri: item.source_icon}}></CustomImage>
                    <CustomText
                      style={styles.sourcename}
                      text={item.source_name}></CustomText>
                  </View>
                  <CustomText
                    style={styles.title}
                    text={item.title}></CustomText>
                </LinearGradient>
              </CustomButton>
            )}></SwiperFlatList>
        )}
      </View>

      <View style={styles.containerForNewsCategories}>
        <CustomText
          text="Trending Right Now"
          style={[
            styles.trendingRightNow,
            {color: isDarkMode ? 'white' : 'black'},
          ]}></CustomText>

        <CustomFlatlist
          horizontal
          ref={FlatlistRef}
          showsHorizontalScrollIndicator={false}
          data={NewsCatagories}
          renderItem={({item, index}) => (
            <CustomButton
              onPress={() => scrollToCateogery(index, item.title)}
              style={{
                borderWidth: 1,
                padding: horizontalScale(10),
                marginTop: verticalScale(14),
                margin: verticalScale(11),
                borderRadius: moderateScale(10),
                backgroundColor: activeIndex === index ? '#FF4C4C' : 'white',
                borderColor: activeIndex === index ? '#FF4C4C' : 'black',
              }}>
              <CustomText
                text={item.title}
                style={{
                  fontSize: moderateScale(13),
                  color: activeIndex === index ? 'white' : 'black',
                  fontWeight: activeIndex === index ? '700' : '400',
                }}></CustomText>
            </CustomButton>
          )}></CustomFlatlist>
      </View>

      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'red'}></ActivityIndicator>
        ) : (
          <CustomFlatlist
            style={{
              marginTop: verticalScale(7),
            }}
            data={newsList}
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
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginTop: verticalScale(3.5),
  },

  containerforImageandText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userImage: {
    height: verticalScale(45),
    width: horizontalScale(45),
    borderRadius: moderateScale(50),
    alignItems: 'center',
  },

  userNameContainer: {
    flexDirection: 'column',
    marginLeft: horizontalScale(10),
  },
  userName: {
    fontWeight: '600',
  },

  Searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: '#E4E4E4',
  },

  SearchIcon: {
    marginLeft: horizontalScale(10),
  },

  Textinput: {
    height: verticalScale(43),
    width: '80%',
    marginLeft: horizontalScale(9),
  },

  BreakingNews: {
    marginHorizontal: horizontalScale(20),
    fontSize: moderateScale(15),
    fontWeight: '500',
  },

  CarosuelImage: {
    height: verticalScale(177),
    marginVertical: verticalScale(12),
    marginHorizontal: horizontalScale(9),
    width: Dimensions.get('screen').width - 20,
    borderRadius: moderateScale(12),
  },
  LinearGradientConatiner: {
    position: 'absolute',
    height: verticalScale(177),
    marginVertical: verticalScale(12),
    marginHorizontal: horizontalScale(9),
    width: Dimensions.get('screen').width - 20,
    borderRadius: moderateScale(12),
  },

  containerforSourceiconandSourceName: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(90),
    paddingHorizontal: horizontalScale(20),
  },

  sourceicon: {
    height: verticalScale(18),
    width: horizontalScale(18),
    borderRadius: moderateScale(10),
  },
  sourcename: {
    color: 'white',
    marginLeft: horizontalScale(15),
    fontSize: 13,
    fontWeight: 600,
  },
  title: {
    position: 'absolute',
    marginTop: verticalScale(119),
    color: 'white',
    marginLeft: horizontalScale(22),
    marginHorizontal: horizontalScale(15),
  },
  containerForNewsCategories: {
    marginTop: verticalScale(6.5),
  },

  trendingRightNow: {
    marginHorizontal: horizontalScale(20),
    fontSize: moderateScale(15),
    fontWeight: '500',
  },

  CategoriesButton: {},
});

export default Home;
