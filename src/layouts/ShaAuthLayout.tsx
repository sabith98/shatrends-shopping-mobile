import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  StatusBar,
  View,
  DimensionValue,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useResponsiveDimensions} from '@utils/responsive';

/**
 * Interface for the ShaAuthLayout component props
 * @interface AuthLayoutProps
 * @property {React.ReactNode} children - Content to be rendered within the layout
 * @property {object} [containerPadding] - Custom padding for the container
 * @property {DimensionValue} [formWidth] - Width of the form container (default: '100%')
 */
interface ShaAuthLayoutProps {
  children: React.ReactNode;
  containerPadding?: object;
  formWidth?: DimensionValue;
}

/**
 * A responsive authentication layout component that handles keyboard behavior,
 * safe areas, scrolling, and form positioning. Optimized for both iOS and Android.
 *
 * @component
 * @example
 * ```
 * <ShaAuthLayout formWidth="90%">
 *   <LoginForm />
 * </ShaAuthLayout>
 *
 * // With custom padding
 * <ShaAuthLayout containerPadding={{padding: 20}}>
 *   <SignupForm />
 * </ShaAuthLayout>
 * ```
 */
export const ShaAuthLayout: React.FC<ShaAuthLayoutProps> = ({
  children,
  containerPadding,
  formWidth = '100%',
}) => {
  const theme = useTheme(); // Access theme for consistent styling
  const {height} = useResponsiveDimensions(); // Get responsive dimensions for layout calculations
  const statusBarHeight = StatusBar.currentHeight || 0; // Get status bar height for Android (iOS handles this via SafeAreaView)

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.colors.background}]}>
      {/* Handle keyboard behavior differently for iOS and Android */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            containerPadding,
            {
              // Adjust minimum height based on platform
              minHeight: height - (Platform.OS === 'ios' ? 0 : statusBarHeight),
              justifyContent: 'center',
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Prevent keyboard dismiss on tap
          >
            {/* Wrapper to constrain form width and center content */}
          <View style={[styles.formWrapper, {width: formWidth}]}>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  formWrapper: {
    maxWidth: 500,
    alignSelf: 'center',
  },
});
