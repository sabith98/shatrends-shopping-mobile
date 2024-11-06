/**
 * Header component for authentication screens
 * Displays a logo, title, and subtitle.
 *
 * Usage:
 *
 * <ShaAuthHeader
 *   logo={{ image: require('./path/to/logo.png'), text: 'My App', size: 50 }}
 *   title="Welcome to My App"
 *   subtitle="Please sign in to continue"
 * />
 */

import {View, StyleSheet} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {spacing, responsiveFontSize} from '@utils/responsive';
import {ShaLogo} from '../common';

/**
 * Interface for the logo configuration within ShaAuthHeader
 * @interface LogoConfig
 * @property {number | {uri: string}} [image] - Source for image logo
 * @property {string} [text] - Text to display as logo
 * @property {number} [size] - Size of the logo
 */
interface LogoConfig {
  image?: number | {uri: string};
  text?: string;
  size?: number;
}

/**
 * Interface for the ShaAuthHeader component props
 * @interface ShaAuthHeaderProps
 * @property {LogoConfig} logo - Configuration for the logo display
 * @property {string} title - Main heading text
 * @property {string} subtitle - Secondary descriptive text
 */
interface ShaAuthHeaderProps {
  logo: LogoConfig;
  title: string;
  subtitle: string;
}

/**
 * A consistent header component for authentication screens (login, signup, etc.).
 * Displays a logo, title, and subtitle in a vertically aligned layout with
 * proper spacing and typography.
 *
 * @component
 * @example
 * ```
 * // With image logo
 * <ShaAuthHeader
 *   logo={{
 *     image: require('../assets/logo.png'),
 *     size: 64
 *   }}
 *   title="Welcome Back"
 *   subtitle="Sign in to continue"
 * />
 *
 * // With text logo
 * <ShaAuthHeader
 *   logo={{
 *     text: "BRAND",
 *     size: 32
 *   }}
 *   title="Create Account"
 *   subtitle="Get started with your journey"
 * />
 * ```
 */
export const ShaAuthHeader: React.FC<ShaAuthHeaderProps> = ({
  logo,
  title,
  subtitle,
}) => {
  const theme = useTheme(); // Access theme for consistent styling

  return (
    <View style={styles.headerContainer}>
      {/* Logo section */}
      <ShaLogo
        imageSource={logo.image}
        textLogo={logo.text}
        size={logo.size}
        style={styles.logo}
      />

      {/* Title text */}
      <Text
        style={[
          styles.title,
          {
            fontSize: responsiveFontSize(24),
            color: theme.colors.onBackground,
          },
        ]}>
        {title}
      </Text>

      {/* Subtitle text */}
      <Text
        style={[
          styles.subtitle,
          {
            fontSize: responsiveFontSize(16),
            color: theme.colors.onSurfaceVariant,
          },
        ]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  logo: {
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontWeight: '400',
  },
});
