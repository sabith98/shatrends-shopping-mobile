import {View, StyleSheet} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {spacing, responsiveFontSize, moderateScale} from '@utils/responsive';
import {ShaLogo} from '../common';

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
 * A header component for authentication screens (login, signup, etc.).
 * Displays a logo, title, and subtitle in a vertically aligned layout with
 *
 * Usage:
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
  const theme = useTheme();

  return (
    <View style={styles.headerContainer}>
      {/* Logo section */}
      <ShaLogo
        imageSource={logo.image}
        textLogo={logo.text}
        size={logo.size || moderateScale(32)}
        style={styles.logo}
      />

      {/* Title text */}
      <Text
        style={[
          styles.title,
          {
            fontSize: responsiveFontSize(20),
            color: theme.colors.onBackground,
            marginTop: moderateScale(24),
          },
        ]}>
        {title}
      </Text>

      {/* Subtitle text */}
      <Text
        style={[
          styles.subtitle,
          {
            fontSize: responsiveFontSize(14),
            color: theme.colors.onSurfaceVariant,
            marginTop: moderateScale(8),
          },
        ]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: moderateScale(32),
    alignItems: 'center',
  },
  logo: {
    marginBottom: moderateScale(8),
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: '80%',
  },
});
