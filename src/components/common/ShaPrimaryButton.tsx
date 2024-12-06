import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {responsiveFontSize, moderateScale} from '@utils/responsive';

interface ShaPrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: object;
  labelStyle?: object;
  mode?: 'contained' | 'outlined';
}

/**
 * Usage:
 * ```
 * <ShaPrimaryButton
 *   label="Submit"
 *   onPress={() => console.log('Button pressed')}
 *   loading={false}
 *   disabled={false}
 *   icon="check"
 *   style={{ margin: 10 }}
 *   labelStyle={{ color: 'white' }}
 *   mode="contained" // or "outlined"
 * />
 * ```
 */
export const ShaPrimaryButton: React.FC<ShaPrimaryButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  icon,
  style,
  labelStyle,
  mode = 'contained',
}) => {
  const theme = useTheme(); // Access theme for consistent styling

  return (
    <Button
      mode={mode}
      icon={icon}
      style={[
        styles.button,
        {
          height: moderateScale(48),
          borderRadius: moderateScale(24),
        },
        // Additional styles for outlined mode
        mode === 'outlined' && {
          borderColor: theme.colors.primary,
          borderWidth: 1.5,
        },
        style,
      ]}
      buttonColor={mode === 'contained' ? theme.colors.primary : 'transparent'}
      contentStyle={[
        styles.buttonContent,
        {height: moderateScale(48)},
      ]}
      labelStyle={[
        styles.buttonLabel,
        {fontSize: responsiveFontSize(14)},
        labelStyle,
      ]}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}>
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  buttonLabel: {
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'none',
  },
});
