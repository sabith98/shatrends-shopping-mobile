import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {ShaSnackbar} from '@components/shared';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {HomeScreenNavigationProp} from '@navigation/types';
import {
  spacing,
  responsiveFontSize,
  moderateScale,
  useResponsiveDimensions,
} from '@utils/responsive';
import {useSignInMutation} from '@api';

interface FormData {
  identifier: string;
  password: string;
}

export const SignInScreen: React.FC<{
  navigation: HomeScreenNavigationProp;
}> = ({navigation}) => {
  const theme = useTheme();
  const {width, height, isPortrait, deviceType} = useResponsiveDimensions();
  const statusBarHeight = StatusBar.currentHeight || 0;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signIn, {isLoading}] = useSignInMutation();
  const [snackbarData, setSnackbarData] = useState({
    message: '',
    type: 'info' as 'success' | 'error' | 'info' | 'warning',
    visible: false,
  });

  // Validation schema for the sign-in form
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Email or username is required')
      .test(
        'email-or-username',
        'Please enter a valid email or username',
        value => {
          // Check if the value is a valid email
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          // Check if the value is a valid username (alphanumeric, underscores, 3-30 characters)
          const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

          return emailRegex.test(value) || usernameRegex.test(value);
        }
      ),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Submit function to handle sign-in
  const onSubmit = async (data: FormData) => {
    try {
      const {identifier, password} = data;
      const response = await signIn({identifier, password}).unwrap();
      console.log('Sign in successful:', response);
      // Show success message
      setSnackbarData({
        message: 'Sign in successful!',
        type: 'success',
        visible: true,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Sign in error:', error);
      // Show error message
      setSnackbarData({
        message: 'Sign in error. Please check your credentials.',
        type: 'error',
        visible: true,
      });
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
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.colors.background}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            getContainerPadding(),
            {
              minHeight: height - (Platform.OS === 'ios' ? 0 : statusBarHeight),
              justifyContent: 'center',
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              styles.formWrapper,
              {
                width: getFormWidth(),
                marginVertical: deviceType === 'phone' ? 0 : spacing.xxl,
              },
            ]}>
            <View style={styles.headerContainer}>
              <Text
                style={[
                  styles.logo,
                  {
                    fontSize: responsiveFontSize(32),
                    color: theme.colors.primary,
                  },
                ]}>
                Shatrends
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: responsiveFontSize(24),
                    color: theme.colors.onBackground,
                  },
                ]}>
                Welcome back
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {
                    fontSize: responsiveFontSize(16),
                    color: theme.colors.onSurfaceVariant,
                  },
                ]}>
                Sign in to continue shopping
              </Text>
            </View>

            <View style={styles.formContainer}>
              {/* Email/Username Input */}
              <Controller
                name="identifier"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[styles.input, {height: moderateScale(56)}]}
                    outlineStyle={{borderRadius: 8}}
                    left={
                      <TextInput.Icon
                        icon="account-outline"
                        color={(focused: boolean) =>
                          focused
                            ? theme.colors.primary
                            : theme.colors.onSurfaceVariant
                        }
                      />
                    }
                    placeholder="Email or username"
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    theme={{
                      colors: {
                        primary: theme.colors.primary,
                        onSurfaceVariant: theme.colors.onSurfaceVariant,
                      },
                    }}
                    error={!!errors.identifier}
                  />
                )}
              />
              {errors.identifier && (
                <Text style={[styles.errorText, {color: theme.colors.error}]}>
                  {errors.identifier.message}
                </Text>
              )}

              {/* Password Input */}
              <Controller
                name="password"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[styles.input, {height: moderateScale(56)}]}
                    outlineStyle={{borderRadius: 8}}
                    secureTextEntry={!showPassword}
                    left={
                      <TextInput.Icon
                        icon="lock-outline"
                        color={(focused: boolean) =>
                          focused
                            ? theme.colors.primary
                            : theme.colors.onSurfaceVariant
                        }
                      />
                    }
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        onPress={() => setShowPassword(!showPassword)}
                        color={theme.colors.onSurfaceVariant}
                      />
                    }
                    placeholder="Password"
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    theme={{
                      colors: {
                        primary: theme.colors.primary,
                        onSurfaceVariant: theme.colors.onSurfaceVariant,
                      },
                    }}
                    error={!!errors.password}
                  />
                )}
              />
              {errors.password && (
                <Text style={[styles.errorText, {color: theme.colors.error}]}>
                  {errors.password.message}
                </Text>
              )}

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

              <Button
                mode="contained"
                style={[
                  styles.signInButton,
                  {
                    height: moderateScale(56),
                    borderRadius: 28,
                  },
                ]}
                buttonColor={theme.colors.primary}
                labelStyle={[
                  styles.buttonLabel,
                  {fontSize: responsiveFontSize(16), letterSpacing: 0.5},
                ]}
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                disabled={isLoading}>
                Sign In
              </Button>
            </View>

            <View style={styles.socialContainer}>
              <View style={styles.divider}>
                <View
                  style={[
                    styles.dividerLine,
                    {backgroundColor: theme.colors.outline},
                  ]}
                />
                <Text
                  style={[
                    styles.orText,
                    {
                      fontSize: responsiveFontSize(14),
                      color: theme.colors.onSurfaceVariant,
                    },
                  ]}>
                  or continue with
                </Text>
                <View
                  style={[
                    styles.dividerLine,
                    {backgroundColor: theme.colors.outline},
                  ]}
                />
              </View>

              <View style={styles.socialButtonsContainer}>
                <Button
                  mode="outlined"
                  icon="google"
                  style={[
                    styles.socialButton,
                    {
                      height: moderateScale(56),
                      borderColor: theme.colors.outline,
                      borderRadius: 28,
                      borderWidth: 1.5,
                    },
                  ]}
                  contentStyle={{
                    height: moderateScale(56),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  labelStyle={[
                    styles.socialButtonLabel,
                    {
                      fontSize: responsiveFontSize(16),
                      letterSpacing: 0.25,
                      fontWeight: '500',
                      color: theme.colors.onBackground,
                    },
                  ]}>
                  Google
                </Button>

                <Button
                  mode="contained"
                  icon="apple"
                  style={[
                    styles.socialButton,
                    {
                      height: moderateScale(56),
                      borderRadius: 28,
                      backgroundColor: '#000000',
                      elevation: 2,
                    },
                  ]}
                  contentStyle={{
                    height: moderateScale(56),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  labelStyle={[
                    styles.socialButtonLabel,
                    {
                      fontSize: responsiveFontSize(16),
                      letterSpacing: 0.25,
                      fontWeight: '500',
                      color: '#FFFFFF',
                    },
                  ]}>
                  Apple
                </Button>
              </View>
            </View>

            <View style={styles.footer}>
              <Text
                style={[
                  styles.signupText,
                  {
                    fontSize: responsiveFontSize(14),
                    color: theme.colors.onSurfaceVariant,
                  },
                ]}>
                Don't have an account?{' '}
                <Text
                  style={[styles.signupLink, {color: theme.colors.primary}]}
                  onPress={() => navigation.navigate('Signup')}>
                  Sign up
                </Text>
              </Text>
            </View>
          </View>

          {/* AppSnackbar component to display notifications */}
          <ShaSnackbar
            message={snackbarData.message}
            type={snackbarData.type}
            visible={snackbarData.visible}
            onDismiss={() =>
              setSnackbarData(prev => ({...prev, visible: false}))
            }
          />
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
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  headerContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  logo: {
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontWeight: '400',
  },
  input: {
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: responsiveFontSize(12),
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotPassword: {
    fontWeight: '500',
  },
  signInButton: {
    justifyContent: 'center',
  },
  buttonLabel: {
    fontWeight: '600',
  },
  socialContainer: {
    marginBottom: spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: spacing.md,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 0.48,
    justifyContent: 'center',
  },
  socialButtonLabel: {
    fontWeight: '500',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  signupText: {
    fontWeight: '400',
  },
  signupLink: {
    fontWeight: '600',
  },
});
