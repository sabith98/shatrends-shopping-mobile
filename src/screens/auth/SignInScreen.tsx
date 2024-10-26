import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginScreenNavigationProp} from '../../navigation/types';

interface FormData {
  email: string;
  password: string;
}

export const SignInScreen: React.FC<{
  navigation: LoginScreenNavigationProp;
}> = ({navigation}) => {
  const {colors} = useTheme();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
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

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement sign-in logic here
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.logo}>Shatrends</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue shopping</Text>
        </View>

        <View style={styles.formContainer}>
          <Controller
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="flat"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                left={<TextInput.Icon icon="email" color={colors.primary} />}
                placeholder="Email"
                placeholderTextColor="#A4AAB9"
                theme={{
                  colors: {
                    primary: colors.primary,
                    background: 'transparent',
                  },
                }}
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Controller
            name="password"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                mode="flat"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" color={colors.primary} />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                    color={colors.primary}
                  />
                }
                placeholder="Password"
                placeholderTextColor="#A4AAB9"
                theme={{
                  colors: {
                    primary: colors.primary,
                    background: 'transparent',
                  },
                }}
                error={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            style={styles.signInButton}
            labelStyle={styles.buttonLabel}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}>
            Sign In
          </Button>
        </View>

        <View style={styles.socialContainer}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <Button
              mode="outlined"
              icon="google"
              style={[styles.socialButton, styles.googleButton]}
              labelStyle={styles.socialButtonLabel}>
              Google
            </Button>

            <Button
              mode="outlined"
              icon="apple"
              style={[styles.socialButton, styles.appleButton]}
              labelStyle={styles.socialButtonLabel}>
              Apple
            </Button>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  formContainer: {
    marginBottom: 32,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF8C00',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    height: 56,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    color: '#FF8C00',
    fontSize: 14,
  },
  signInButton: {
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  orText: {
    marginHorizontal: 16,
    color: '#666666',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 0.48,
    height: 56,
    justifyContent: 'center',
    borderColor: '#E5E5E5',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  appleButton: {
    backgroundColor: '#FFFFFF',
  },
  socialButtonLabel: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666666',
  },
  signupLink: {
    color: '#FF8C00',
    fontWeight: '600',
  },
});
