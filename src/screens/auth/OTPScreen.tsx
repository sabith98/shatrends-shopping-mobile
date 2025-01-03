import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useVerifyOTPMutation, useForgotPasswordMutation} from '@api/authApi';
import {theme} from '@theme/index';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import {getContainerPadding} from '@utils/responsiveLayout';
import {useResponsiveDimensions} from '@utils/responsive';
import {ShaPrimaryButton} from '@components/common';
import {useToast} from '@hooks/useToast';
import {OTPScreenNavigationProp} from '../../navigation/types';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30; // seconds

type OTPScreenProps = {
  navigation: OTPScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'OTP'>;
};

const OTPScreen: React.FC<OTPScreenProps> = ({navigation, route}) => {
  const {email} = route.params;
  const {deviceType} = useResponsiveDimensions();
  const {showToast} = useToast();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(RESEND_COOLDOWN);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const [verifyOTP, {isLoading: isVerifying}] = useVerifyOTPMutation();
  const [requestOTP, {isLoading: isRequesting}] = useForgotPasswordMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !isResendActive) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendActive(true);
    }
    return () => clearInterval(interval);
  }, [timer, isResendActive]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    try {
      await requestOTP({email});
      setTimer(RESEND_COOLDOWN);
      setIsResendActive(false);
      showToast('OTP resent successfully', 'success');
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== OTP_LENGTH) {
      showToast('Please enter complete OTP', 'error');
      return;
    }

    try {
      await verifyOTP({email, otp: otpString});
      showToast('OTP verified successfully', 'success');
      navigation.navigate('ResetPassword', {email, otp: otpString});
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  return (
    <View style={[styles.container, getContainerPadding(deviceType)]}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Please enter the verification code sent to {email}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={styles.otpInput}
            value={digit}
            onChangeText={value => handleOtpChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>

      <ShaPrimaryButton
        label="Verify OTP"
        onPress={handleVerifyOTP}
        loading={isVerifying}
        disabled={isVerifying || otp.join('').length !== OTP_LENGTH}
      />

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code? </Text>
        {isResendActive ? (
          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={isRequesting}>
            <Text style={styles.resendButton}>
              {isRequesting ? 'Sending...' : 'Resend'}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timer}>{timer}s</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body1,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: theme.colors.surface,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  resendText: {
    ...typography.body2,
    color: theme.colors.secondary,
  },
  resendButton: {
    ...typography.body2,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  timer: {
    ...typography.body2,
    color: theme.colors.primary,
  },
});

export default OTPScreen;
