import {View, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomFlatlist from '../../components/CustomFlatlist';
import CustomButton from '../../components/CustomButton';
import CustomImage from '../../components/CustomImage';
import CustomText from '../../components/CustomText';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles/Metrics';

const Searchscreen = (props: any) => {
  const navigation = useNavigation<any>();
  const {query, category, country} = props.route.params;

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getNewsList() {
    try {
      let queryString = '';
      let categoryString = '';
      let countryString = '';
      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      if (query) {
        queryString = `&q=${query}`;
      }

      let response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_647508b3507833ba98751b55d47f2d6fa4bbd&language=en&size=10&removeduplicate=1${categoryString}${countryString}${queryString}`,
      );

      console.log(response.data.results);
      setNewsList(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   getNewsList();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={'red'}></ActivityIndicator>
        </View>
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
                // backgroundColor: 'yellow',
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
                  }}></CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(13),
                  }}
                  text={item.title}></CustomText>

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <CustomImage
                    style={{
                      height: verticalScale(18),
                      width: horizontalScale(18),
                      borderRadius: moderateScale(10),
                    }}
                    source={{uri: item.source_icon}}></CustomImage>
                  <CustomText text={item.source_name}></CustomText>
                </View>
              </View>
            </CustomButton>
          )}></CustomFlatlist>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Searchscreen;
