import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components
import {ShaAuthLayout} from '@layouts';
import {ShaAuthHeader} from '@components/auth';
import {ShaPrimaryButton, ShaSnackbar, ShaTextInput} from '@components/common';

// API & Types
import {useForgotPasswordMutation} from '@api/authApi';
import {ForgotPasswordScreenNavigationProp} from '@navigation/types';

// Utils & Theme
import {spacing} from '@theme/spacing';
import {formatErrorMessage} from '@utils/errorHandler';
import {responsiveFontSize, useResponsiveDimensions} from '@utils/responsive';
import {getContainerPadding, getFormWidth} from '@utils/responsiveLayout';
import {useTheme} from 'react-native-paper';

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();
  const {deviceType, isPortrait} = useResponsiveDimensions();
  const [forgotPassword] = useForgotPasswordMutation();
  const [snackbarData, setSnackbarData] = useState<{
    message: string;
    type: 'error' | 'success';
    visible: boolean;
  }>({
    message: '',
    type: 'error',
    visible: false,
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data).unwrap();
      setSnackbarData({
        message: 'Password reset instructions sent to your email',
        type: 'success',
        visible: true,
      });
      // Navigate to ResetPassword screen after successful email send
      navigation.navigate('ResetPassword');
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
      <View style={styles.contentContainer}>
        <ShaAuthHeader
          logo={{
            text: 'Shatrends',
            size: 32
          }}
          title="Forgot Password"
          subtitle="Enter your email address and we'll send you instructions to reset your password."
        />

        <View style={styles.formContainer}>
          <ShaTextInput
            name="email"
            icon="email"
            control={control}
            placeholder="Enter Your Email"
            error={errors.email?.message}
            keyboardType="email-address"
          />

          <ShaPrimaryButton
            label="Send Reset Instructions"
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          />
        </View>
      </View>

      <ShaSnackbar
        visible={snackbarData.visible}
        message={snackbarData.message}
        onDismiss={() =>
          setSnackbarData(prev => ({...prev, visible: false}))
        }
        type={snackbarData.type}
      />
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

export default ForgotPasswordScreen;
