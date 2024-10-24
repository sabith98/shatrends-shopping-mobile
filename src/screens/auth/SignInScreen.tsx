import React, {useState, useLayoutEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput, Button, useTheme} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginScreenNavigationProp} from '../../navigation/types';

// Type for form input data
interface FormData {
  email: string;
  password: string;
}

export const SignInScreen: React.FC<{
  navigation: LoginScreenNavigationProp;
}> = ({navigation}) => {
  const {colors} = useTheme();

  // Validation schema using yup
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

  // React Hook Form setup with yup validation
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Function to handle form submission
  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    // TODO: Implement sign-in logic here
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Shatrends</Text>
      <Text style={styles.title}>Let’s get started!</Text>
      <Text style={styles.subtitle}>
        Your style, your trends. Sign in to shop the latest fashion.
      </Text>

      {/* Email Label */}
      <Text style={styles.inputLabel}>Email</Text>

      {/* Email Field with validation */}
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            left={<TextInput.Icon icon="email" color="#ADB2C3" />}
            placeholder="Enter email"
            placeholderTextColor="#A4AAB9"
            theme={{
              roundness: 15,
              colors: {
                primary: '#ADB2C3',
              },
            }}
            error={!!errors.email}
          />
        )}
      />
      {/* Display email error message */}
      {errors.email && (
        <Text style={[styles.errorText, {color: '#ADB2C3'}]}>
          {errors.email.message}
        </Text>
      )}

      {/* Password Label */}
      <Text style={styles.inputLabel}>Password</Text>

      {/* Password Field with validation */}
      <Controller
        name="password"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" color="#ADB2C3" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color="#ADB2C3"
              />
            }
            placeholder="Enter Password"
            placeholderTextColor="#A4AAB9"
            theme={{
              roundness: 15,
              colors: {
                primary: '#ADB2C3',
              },
            }}
            error={!!errors.password}
          />
        )}
      />
      {/* Display password error message */}
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Forgot Password link */}
      <TouchableOpacity
        onPress={() => {
          /* TODO: Handle forgot password navigation */
        }}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <Button
        mode="contained"
        style={styles.signInButton}
        onPress={handleSubmit(onSubmit)}
        theme={{roundness: 30}}>
        Sign In
      </Button>

      {/* OR text for alternative login options */}
      <Text style={styles.orText}>or</Text>

      {/* Social Login with Google */}
      <Button
        mode="outlined"
        icon="google"
        style={styles.socialButton}
        onPress={() => {
          /* TODO: Handle Google login */
        }}
        theme={{roundness: 30}}>
        Continue with Google
      </Button>

      {/* Social Login with Apple */}
      <Button
        mode="contained"
        icon="apple"
        style={styles.appleButton}
        onPress={() => {
          /* TODO: Handle Apple login */
        }}
        theme={{roundness: 30}}>
        Continue with Apple
      </Button>

      {/* Signup prompt */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

// Styles for the login screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFA500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#F8F9FD',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  forgotPassword: {
    color: '#FFA500',
    textAlign: 'right',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#FFA500',
    marginBottom: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#777',
  },
  socialButton: {
    borderColor: '#4285F4',
    borderWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  appleButton: {
    backgroundColor: '#000',
    marginBottom: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
  },
  signupLink: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
});
