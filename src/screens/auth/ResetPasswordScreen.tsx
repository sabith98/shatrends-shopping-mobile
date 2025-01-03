import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components
import {ShaAuthLayout} from '@layouts';
import {ShaAuthHeader} from '@components/auth';
import {ShaPrimaryButton, ShaTextInput} from '@components/common';

// API & Types
import {useResetPasswordMutation} from '@api/authApi';
import {ResetPasswordScreenNavigationProp} from '@navigation/types';

// Utils & Theme
import {spacing} from '@theme/spacing';
import {formatErrorMessage} from '@utils/errorHandler';
import {responsiveFontSize, useResponsiveDimensions} from '@utils/responsive';
import {getContainerPadding, getFormWidth} from '@utils/responsiveLayout';
import {theme} from '@theme';
import {useToast} from '@hooks/useToast';

interface Props {
  navigation: ResetPasswordScreenNavigationProp;
}

interface FormData {
  code: string;
  password: string;
  passwordConfirmation: string;
}

const schema = yup.object().shape({
  code: yup.string().required('Reset code is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    )
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

const ResetPasswordScreen: React.FC<Props> = ({navigation}) => {
  const {deviceType, isPortrait} = useResponsiveDimensions();
  const [resetPassword] = useResetPasswordMutation();
  const {showToast} = useToast();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data).unwrap();
      showToast('Password reset successful', 'success');
      // Navigate to SignIn screen after successful password reset
      navigation.navigate('SignIn');
    } catch (error: any) {
      showToast(formatErrorMessage(error.error.data), 'error');
    }
  };

  return (
    <ShaAuthLayout
      containerPadding={getContainerPadding(deviceType)}
      formWidth={getFormWidth(deviceType, isPortrait)}>
      <View style={styles.contentContainer}>
        <ShaAuthHeader
          logo={{
            text: 'Shatrends',
            size: 32,
          }}
          title="Reset Password"
          subtitle="Enter the code from your email and create a new password."
        />

        <View style={styles.formContainer}>
          <ShaTextInput
            name="code"
            control={control}
            placeholder="Reset Code"
            error={errors.code?.message}
          />

          <ShaTextInput
            name="password"
            control={control}
            placeholder="New Password"
            error={errors.password?.message}
            secureTextEntry
          />

          <ShaTextInput
            name="passwordConfirmation"
            control={control}
            placeholder="Confirm New Password"
            error={errors.passwordConfirmation?.message}
            secureTextEntry
          />

          <ShaPrimaryButton
            label="Reset Password"
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          />
        </View>
      </View>
    </ShaAuthLayout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  submitButton: {
    marginTop: spacing.xl,
  },
});

export default ResetPasswordScreen;
