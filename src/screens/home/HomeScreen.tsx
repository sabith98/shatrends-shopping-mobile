import React from 'react';
import {View, Text} from 'react-native';
import {useLogoutMutation} from '@api';
import {Button} from 'react-native-paper';

const HomeScreen = () => {
  const [logout, {isLoading}] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // navigation.navigate('SignIn'); // Navigate back to the SignIn screen after logging out
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={handleLogout} disabled={isLoading}>
        Logout
      </Button>
    </View>
  );
};
export default HomeScreen;
