import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Components
import {ShaAuthLayout} from '@layouts';
import {ShaAuthFooter, ShaAuthHeader, ShaSocialButton} from '@components/auth';
import {ShaPrimaryButton, ShaSnackbar, ShaTextInput} from '@components/common';

// API & Types
import {useSignUpMutation} from '@api';
import {RootStackParamList} from '@navigation/types';

// Utils & Theme
import {theme} from '@/theme';
import {spacing} from '@theme/spacing';
import {formatErrorMessage} from '@utils/errorHandler';
import {responsiveFontSize, useResponsiveDimensions} from '@utils/responsive';
import {getContainerPadding, getFormWidth} from '@utils/responsiveLayout';

// Form validation schema
const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

interface FormData {
  username: string;
  email: string;
  password: string;
}

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  // State and hooks setup
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, {isLoading}] = useSignUpMutation();
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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Handles the sign-up form submission
  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data).unwrap();
      setSnackbarData({
        message: 'Sign up successful! Please check your email to verify your account.',
        type: 'success',
        visible: true,
      });
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
      setSnackbarData({
        message: `${provider} authentication is not yet available`,
        type: 'info',
        visible: true,
      });
    } catch (error: any) {
      setSnackbarData({
        message: formatErrorMessage(error.error.data),
        type: 'error',
        visible: true,
      });
    }
  };

  return (
    <ShaAuthLayout
      containerPadding={getContainerPadding(deviceType)}
      formWidth={getFormWidth(deviceType, isPortrait)}>
      <ShaAuthHeader
        logo={{
          text: 'Shatrends',
          size: 32,
        }}
        title="Create Account"
        subtitle="Sign up to start shopping"
      />

      <View style={styles.formContainer}>
        <ShaTextInput
          name="username"
          control={control}
          icon="account-outline"
          placeholder="Username"
          error={errors.username?.message}
        />

        <ShaTextInput
          name="email"
          control={control}
          icon="email-outline"
          placeholder="Email"
          error={errors.email?.message}
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

        <ShaPrimaryButton
          label="Create Account"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          loading={isLoading}
          style={styles.signUpButton}
        />
      </View>

      <View style={styles.socialContainer}>
        <Text style={styles.orText}>Or sign up with</Text>
        <View style={styles.socialButtonsRow}>
          <ShaSocialButton
            provider="google"
            onPress={() => handleSocialAuth('google')}
            style={styles.socialButton}
          />
          <ShaSocialButton
            provider="apple"
            onPress={() => handleSocialAuth('apple')}
            style={styles.socialButton}
          />
        </View>
      </View>

      <ShaAuthFooter
        message="Already have an account?"
        linkText="Sign In"
        onLinkPress={() => navigation.navigate('SignIn')}
      />

      <ShaSnackbar
        message={snackbarData.message}
        type={snackbarData.type}
        visible={snackbarData.visible}
        onDismiss={() => setSnackbarData(prev => ({...prev, visible: false}))}
      >
      </ShaSnackbar>
    </ShaAuthLayout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  signUpButton: {
    marginTop: spacing.lg,
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  orText: {
    fontSize: responsiveFontSize(14),
    color: theme.colors.onSurfaceVariant,
    marginBottom: spacing.md,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  socialButton: {
    marginHorizontal: spacing.xs,
  },
  footerContainer: {
    paddingVertical: spacing.md,
  },
});

export default SignUpScreen;
