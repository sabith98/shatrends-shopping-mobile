import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Components
import {ShaAuthLayout} from '@layouts';
import {ShaAuthFooter, ShaAuthHeader, ShaSocialButton} from '@components/auth';
import {ShaPrimaryButton, ShaTextInput} from '@components/common';

// API & Types
import {useSignInMutation} from '@api';
import {RootStackParamList} from '@navigation/types';

// Utils & Theme
import {theme} from '@theme';
import {spacing} from '@theme/spacing';
import {formatErrorMessage} from '@utils/errorHandler';
import {responsiveFontSize, useResponsiveDimensions} from '@utils/responsive';
import {getContainerPadding, getFormWidth} from '@utils/responsiveLayout';
import {useToast} from '@hooks/useToast';

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

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

interface Props {
  navigation: SignInScreenNavigationProp;
}

const SignInScreen: React.FC<Props> = ({navigation}) => {
  // State and hooks setup
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, {isLoading}] = useSignInMutation();
  const {deviceType, isPortrait} = useResponsiveDimensions();
  const {showToast} = useToast();

  // Form handling setup
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Handles the sign-in form submission
  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data).unwrap();
      showToast('Sign in successful!', 'success');
      navigation.navigate('Home');
    } catch (error: any) {
      showToast(formatErrorMessage(error.error.data), 'error');
    }
  };

  /**
   * Handles social authentication
   * @param provider - The social auth provider (google, apple, etc.)
   */
  const handleSocialAuth = async (provider: string) => {
    try {
      showToast(`${provider} authentication is not yet available`, 'info');
    } catch (error: any) {
      showToast(formatErrorMessage(error.error.data), 'error');
    }
  };

  return (
    <ShaAuthLayout
      containerPadding={getContainerPadding(deviceType)}
      formWidth={getFormWidth(deviceType, isPortrait)}>
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
        <Text style={styles.orText}>Or sign in with</Text>
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
        onLinkPress={() => navigation.navigate('SignUp')}
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
    alignItems: 'center',
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
  orText: {
    fontSize: responsiveFontSize(14),
    color: theme.colors.onSurfaceVariant,
    marginBottom: spacing.md,
  },
});

export default SignInScreen;
