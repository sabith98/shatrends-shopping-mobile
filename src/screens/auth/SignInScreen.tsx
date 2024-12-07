import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {ShaAuthLayout} from '@layouts';
import {ShaAuthFooter, ShaAuthHeader, ShaSocialButton} from '@components/auth';
import {ShaPrimaryButton, ShaSnackbar, ShaTextInput} from '@components/common';
import {useSignInMutation} from '@api';
import {
  responsiveFontSize,
  spacing,
  useResponsiveDimensions,
} from '@utils/responsive';
import {theme} from '@/theme';
import {formatErrorMessage} from '@utils/errorHandler';

// Form validation schema
const schema = yup.object().shape({
  identifier: yup
    .string()
    .required('Email or username is required')
    .test(
      'email-or-username',
      'Please enter a valid email or username',
      value => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      }
    ),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

interface FormData {
  identifier: string;
  password: string;
}

const SignInScreen: React.FC<{navigation: any}> = ({navigation}) => {
  // State and hooks setup
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, {isLoading}] = useSignInMutation();
  const {deviceType, isPortrait} = useResponsiveDimensions();
  const [snackbarData, setSnackbarData] = useState({
    message: '',
    type: 'info' as 'success' | 'error' | 'info' | 'warning',
    visible: false,
  });

  // Form handling setup
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handles the sign-in form submission
  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data).unwrap();
      setSnackbarData({
        message: 'Sign in successful!',
        type: 'success',
        visible: true,
      });
      navigation.navigate('Home');
    } catch (error: any) {
      setSnackbarData({
        message: formatErrorMessage(error.error.data),
        type: 'error',
        visible: true,
      });
    }
  };

  /**
   * Handles social authentication
   * @param provider - The social auth provider (google, apple, etc.)
   */
  const handleSocialAuth = async (provider: string) => {
    try {
      // TODO: Implement social auth logic
      console.log(`${provider} sign in attempted`);
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  const getContainerPadding = () => {
    switch (deviceType) {
      case 'tablet':
        return {paddingHorizontal: spacing.xl};
      case 'desktop':
        return {paddingHorizontal: spacing.xxl};
      default:
        return {paddingHorizontal: spacing.md};
    }
  };

  const getFormWidth = () => {
    switch (deviceType) {
      case 'tablet':
        return isPortrait ? '80%' : '60%';
      case 'desktop':
        return '40%';
      default:
        return '100%';
    }
  };

  return (
    <ShaAuthLayout
      containerPadding={getContainerPadding()}
      formWidth={getFormWidth()}>
      <ShaAuthHeader
        logo={{
          // Uncomment and use image when available
          // image: require('@assets/images/logo.png'),
          text: 'Shatrends',
          size: 32,
        }}
        title="Welcome back"
        subtitle="Sign in to continue shopping"
      />

      <View style={styles.formContainer}>
        <ShaTextInput
          name="identifier"
          control={control}
          icon="account-outline"
          placeholder="Email or username"
          error={errors.identifier?.message}
        />

        <ShaTextInput
          name="password"
          control={control}
          icon="lock-outline"
          placeholder="Password"
          secureTextEntry={!showPassword}
          rightIcon={{
            name: showPassword ? 'eye-off-outline' : 'eye-outline',
            onPress: () => setShowPassword(!showPassword),
          }}
          error={errors.password?.message}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPasswordContainer}>
          <Text
            style={[
              styles.forgotPassword,
              {
                fontSize: responsiveFontSize(14),
                color: theme.colors.primary,
              },
            ]}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <ShaPrimaryButton
          label="Sign In"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          loading={isLoading}
          style={styles.signInButton}
        />
      </View>

      <View style={styles.socialContainer}>
        <View style={styles.socialButtonsRow}>
          <ShaSocialButton
            provider="google"
            onPress={() => handleSocialAuth('google')}
            style={styles.socialButtonSpacing}
          />
          <ShaSocialButton
            provider="apple"
            onPress={() => handleSocialAuth('apple')}
            style={styles.socialButtonSpacing}
          />
        </View>
      </View>

      <ShaAuthFooter
        message="Don't have an account?"
        linkText="Sign up"
        onLinkPress={() => navigation.navigate('Signup')}
      />

      {/* AppSnackbar component to display notifications */}
      <ShaSnackbar
        message={snackbarData.message}
        type={snackbarData.type}
        visible={snackbarData.visible}
        onDismiss={() => setSnackbarData(prev => ({...prev, visible: false}))}
      />
    </ShaAuthLayout>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: spacing.xl,
  },
  signInButton: {
    marginTop: spacing.lg,
  },
  socialContainer: {
    marginTop: spacing.xl,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButtonSpacing: {
    marginHorizontal: spacing.xs,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotPassword: {
    fontWeight: '500',
  },
});

export default SignInScreen;
