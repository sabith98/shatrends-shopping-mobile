import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// Type definition for the navigation stack parameters
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    email: string | undefined;
    otp: string;
  };
  OTP: {
    email?: string;
    mode?: 'forgotPassword' | 'signup';
  };
};

// Navigation prop types for each screen based on the RootStackParamList
export type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;
export type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;
export type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;
export type OTPScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTP'
>;

export type OTPScreenProps = {
  navigation: OTPScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'OTP'>;
};
