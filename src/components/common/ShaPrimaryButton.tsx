import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {responsiveFontSize, moderateScale} from '@utils/responsive';

/**
 * Interface for the ShaPrimaryButton component props
 * @interface ShaPrimaryButtonProps
 * @property {string} label - Text to display on the button
 * @property {() => void} onPress - Callback function when button is pressed
 * @property {boolean} [loading] - Whether to show loading state
 * @property {boolean} [disabled] - Whether the button is disabled
 * @property {string} [icon] - Name of the icon to display (from react-native-paper icons)
 * @property {object} [style] - Additional styles for the button container
 * @property {object} [labelStyle] - Additional styles for the button label
 * @property {'contained' | 'outlined'} [mode] - Button appearance mode
 */
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
 * A customizable primary button component built on top of React Native Paper's Button.
 * Supports different modes, loading states, icons, and responsive sizing.
 *
 * @component
 * @example
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
          height: moderateScale(56),
          borderRadius: 28,
        },
        // Additional styles for outlined mode
        mode === 'outlined' && {
          borderColor: theme.colors.primary,
          borderWidth: 1.5,
        },
        style,
      ]}
      buttonColor={mode === 'contained' ? theme.colors.primary : 'transparent'}
      contentStyle={styles.buttonContent}
      labelStyle={[
        styles.buttonLabel,
        {fontSize: responsiveFontSize(16)},
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
  },
  buttonContent: {
    height: moderateScale(56),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
