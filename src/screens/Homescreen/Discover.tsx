import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomTextinput from '../../components/CustomTextinput';
import Search from 'react-native-vector-icons/AntDesign';
import CustomText from '../../components/CustomText';
import {NewsCatagories} from '../../DataSet/CategoriesData';
import {Countries} from '../../DataSet/CountriesData';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../Themes/ThemeContext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles/Metrics';

const Discover = () => {
  const {isDarkMode, toggleTheme} = useTheme();
  const navigation = useNavigation<any>();

  const [catgeoriesSelected, setCatgeoriesSelected] = useState<any>([]);
  const [countriesSelected, setCountriesSelected] = useState<any>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<any>([]);
  const [country, setCountry] = useState<any>('');

  function handleCatgeoriesSelect(item: any) {
    if (!category.includes(item.slug)) {
      setCategory([...category, item.slug]);
    }
    setCatgeoriesSelected((prev: any) => {
      console.log(prev, 'prev');
      const exist = prev.findIndex((i: any) => i === item.id);
      if (exist !== -1) {
        console.log('exist', exist);
        prev.splice(exist, 1);
        console.log(prev, 'lllll');
        return [...prev];
      } else {
        return [...prev, item.id];
      }
    });
  }

  function handleCountriesSelect(item: any) {
    if (!country.includes(item.code)) {
      setCountry([...country, item.code]);
    }
    setCountriesSelected((prev: any) => {
      const exist = prev.findIndex((i: any) => i === item.id);
      if (exist !== -1) {
        prev.splice(exist, 1);
        return [...prev];
      } else {
        return [...prev, item.id];
      }
    });
  }

  const handleSearch = () => {
    if (
      searchQuery.trim() !== '' &&
      category.length > 0 &&
      country.length > 0
    ) {
      navigation.navigate('Search', {
        query: searchQuery,
        category,
        country,
      });
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: isDarkMode ? 'black' : 'white'}}>
      <View style={styles.Container}>
        <View style={styles.Searchcontainer}>
          <Search
            name="search1"
            size={moderateScale(20)}
            style={styles.SearchIcon}></Search>
          <CustomTextinput
            placeholderTextColor="black"
            placeholder="Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={styles.Textinput}></CustomTextinput>
        </View>

        <CustomText
          style={styles.CategoriesText}
          text="Categories"></CustomText>

        <View style={styles.CategoriesContainer}>
          {NewsCatagories.map((item, index) => (
            <CustomButton
              key={item.id}
              onPress={() => handleCatgeoriesSelect(item)}>
              <CustomText
                style={{
                  backgroundColor: catgeoriesSelected.includes(item.id)
                    ? '#FF4C4C'
                    : 'white',

                  borderColor: catgeoriesSelected.includes(item.id)
                    ? 'FF4C4C'
                    : 'black',
                  color: catgeoriesSelected.includes(item.id)
                    ? 'white'
                    : 'black',
                  fontWeight: catgeoriesSelected.includes(item.id)
                    ? '600'
                    : null,
                  borderWidth: 1,
                  margin: horizontalScale(10),
                  padding: verticalScale(9),
                  borderRadius: moderateScale(15),
                }}
                text={item.title}></CustomText>
            </CustomButton>
          ))}
        </View>

        <CustomText style={styles.CountryText} text="Country"></CustomText>

        <View style={styles.CountryContainer}>
          {Countries.map(item => (
            <CustomButton
              key={item.id}
              onPress={() => handleCountriesSelect(item)}>
              <CustomText
                style={{
                  backgroundColor: countriesSelected.includes(item.id)
                    ? '#FF4C4C'
                    : 'white',
                  borderWidth: 1,
                  borderColor: countriesSelected.includes(item.id)
                    ? 'FF4C4C'
                    : 'black',
                  color: countriesSelected.includes(item.id)
                    ? 'white'
                    : 'black',
                  fontWeight: countriesSelected.includes(item.id)
                    ? '600'
                    : null,
                  margin: horizontalScale(10),
                  padding: verticalScale(9),
                  borderRadius: moderateScale(15),
                }}
                text={item.name}></CustomText>
            </CustomButton>
          ))}
        </View>

        <CustomButton style={styles.Button} onPress={handleSearch}>
          <CustomText style={styles.ButtonTitle} text="Search"></CustomText>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
  },
  Searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: '#E4E4E4',
  },
  SearchIcon: {
    marginLeft: horizontalScale(10),
  },
  Textinput: {
    height: verticalScale(42),
    width: '80%',
    marginLeft: horizontalScale(9),
  },
  CategoriesText: {
    fontSize: moderateScale(15),
    marginLeft: horizontalScale(15),
    fontWeight: '500',
  },
  CategoriesContainer: {
    // backgroundColor : 'red',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: verticalScale(10),
  },

  Category: {
    // backgroundColor: 'red',
    borderWidth: 1,
    margin: horizontalScale(10),
    padding: verticalScale(9),
    borderRadius: moderateScale(15),
  },

  CountryText: {
    fontSize: moderateScale(15),
    marginLeft: horizontalScale(15),
    fontWeight: '500',
    marginTop: verticalScale(15),
  },
  CountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: verticalScale(10),
  },

  Country: {
    borderWidth: 1,
    margin: horizontalScale(10),
    padding: verticalScale(9),
    borderRadius: moderateScale(15),
  },
  Button: {
    width: '100%',
    height: verticalScale(41),
    backgroundColor: '#FF4C4C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
  },
  ButtonTitle: {
    fontSize: moderateScale(15),
    color: 'white',
    fontWeight: '600',
  },
});

export default Discover;
