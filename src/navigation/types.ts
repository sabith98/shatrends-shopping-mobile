import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Type definition for the navigation stack parameters
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  OTP: undefined;
};

// Navigation prop types for each screen based on the RootStackParamList
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;
export type OTPScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTP'
>;
