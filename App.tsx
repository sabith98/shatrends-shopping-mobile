import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {AppNavigator} from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './src/theme';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.flexOne}>
            <AppNavigator />
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  flexOne: {flex: 1},
});
