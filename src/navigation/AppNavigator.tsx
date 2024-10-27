/**
 * Root navigation component
 * Handles authentication-based navigation flow
 */

import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useShaAuth} from '@hooks';
import {
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  OTPScreen,
  HomeScreen,
} from '@screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useShaAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    // TODO: Implement LoadingScreen
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Conditional rendering based on authentication state */}
        {!isAuthenticated ? (
          // Auth Stack
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={SignInScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="OTP" component={OTPScreen} />
          </Stack.Group>
        ) : (
          // Main Stack
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
