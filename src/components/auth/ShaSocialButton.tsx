import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ShaPrimaryButton} from '../common';

/**
 * Interface for the ShaSocialButton component props
 * @interface ShaSocialButtonProps
 * @property {'google' | 'apple' | 'facebook'} provider - Social provider identifier
 * @property {() => void} onPress - Callback function when button is pressed
 * @property {object} [style] - Additional styles to apply to the button
 */
interface ShaSocialButtonProps {
  provider: 'google' | 'apple' | 'facebook';
  onPress: () => void;
  style?: object;
}

interface ProviderConfig {
  icon: string;
  label: string;
  mode: 'outlined' | 'contained';
  backgroundColor?: string;
  textColor: string;
}

/**
 * Configuration object for social providers
 * Defines the visual appearance and content for each social login option
 * @constant
 */
const PROVIDER_CONFIG: Record<string, ProviderConfig> = {
  google: {
    icon: 'google',
    label: 'Google',
    mode: 'outlined' as const,
    textColor: 'onBackground',
  },
  apple: {
    icon: 'apple',
    label: 'Apple',
    mode: 'contained' as const,
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
  facebook: {
    icon: 'facebook',
    label: 'Facebook',
    mode: 'contained' as const,
    backgroundColor: '#1877F2',
    textColor: '#FFFFFF',
  },
};

/**
 * A customizable social login button component that supports multiple providers
 * with their respective branded appearances. Builds on top of ShaPrimaryButton
 * with specific styling for each social platform.
 *
 * @component
 * @example
 * ```
 * // Single provider
 * <ShaSocialButton
 *   provider="google"
 *   onPress={() => console.log('Google button pressed')}
 *   style={{ marginVertical: 10 }}
 * />
 *
 * // Multiple providers side by side
 * <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
 *   <ShaSocialButton provider="google" onPress={handleGoogleLogin} />
 *   <ShaSocialButton provider="apple" onPress={handleAppleLogin} />
 * </View>
 * ```
 */
export const ShaSocialButton: React.FC<ShaSocialButtonProps> = ({
  provider,
  onPress,
  style,
}) => {
  const theme = useTheme(); // Access theme for consistent styling
  const config = PROVIDER_CONFIG[provider]; // Get provider-specific configuration

  return (
    <ShaPrimaryButton
      mode={config.mode}
      icon={config.icon}
      label={config.label}
      onPress={onPress}
      style={[
        styles.socialButton,
        config.backgroundColor && {
          backgroundColor: config.backgroundColor,
        },
        style,
      ]}
      labelStyle={{
        color:
          config.textColor === 'onBackground'
            ? theme.colors.onBackground
            : config.textColor,
      }}
    />
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flex: 0.48, // For when two buttons are placed side by side
  },
});
