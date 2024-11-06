import React from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveFontSize, spacing} from '@utils/responsive';

/**
 * Interface for the ShaLogo component props
 * @interface ShaLogoProps
 * @property {number | {uri: string}} [imageSource] - Source for image logo. Can be a local require() or remote URI
 * @property {string} [textLogo] - Text to display when no image is provided
 * @property {number} [size] - Size of the logo (applies to both image and text)
 * @property {object} [style] - Additional styles to apply to the logo
 */
interface ShaLogoProps {
  imageSource?: number | {uri: string};
  textLogo?: string;
  size?: number;
  style?: object;
}

/**
 * A flexible logo component that can display either an image or text logo
 * with customizable size and styling. Falls back to text display if no image
 * is provided.
 *
 * @component
 * @example
 * ```
 * // Image logo
 * <ShaLogo imageSource={require('../assets/logo.png')} size={48} />
 *
 * // Text logo
 * <ShaLogo textLogo="BRAND" size={32} />
 * ```
 */
export const ShaLogo: React.FC<ShaLogoProps> = ({
  imageSource,
  textLogo,
  size = 32,
  style,
}) => {
  const theme = useTheme(); // Access theme for consistent branding colors

  // Render image logo if imageSource is provided
  if (imageSource) {
    return (
      <Image
        source={imageSource}
        style={[styles.image, {width: size, height: size}, style]}
        resizeMode="contain"
      />
    );
  }

  // Fallback to text logo
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: responsiveFontSize(size),
          color: theme.colors.primary,
        },
        style,
      ]}>
      {textLogo}
    </Text>
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: spacing.md,
  },
  text: {
    fontWeight: '700',
    marginBottom: spacing.md,
  },
});
