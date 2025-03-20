import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  NewsDetails: undefined;
  Search: undefined;
  BottomTab: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Discover: undefined;
  Saved: undefined;
  Settings: undefined;
};

export type SplashScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export type NewsDetailsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsDetails'
>;

export type SearchNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Search'
>;

export type BottomTabNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'BottomTab'
>;
