/**
 * Root navigation component
 * Handles authentication-based navigation flow
 */

import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack, MainStack} from './stacks';
import {storage} from '@services/storage';
import {STORAGE_KEYS} from '@constants/storage';
import {clearAuth} from '@store/slices/authSlice';
import {useShaAuth} from '@hooks';
import { useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, isLoading} = useShaAuth();

  // Check token on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        // If no token exists, clear auth state immediately
        dispatch(clearAuth());
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Show loading screen while checking authentication
  if (isLoading) {
    // TODO: Implement LoadingScreen
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Conditional rendering based on authentication state */}
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
