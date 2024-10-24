import {StyleSheet, SafeAreaView} from 'react-native';
import {AppNavigator} from '@navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import theme from './src/theme/theme';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.flexOne}>
          <AppNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  flexOne: {flex: 1},
});
