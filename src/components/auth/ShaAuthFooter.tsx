import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {spacing, responsiveFontSize} from '@utils/responsive';

/**
 * Interface for the ShaAuthFooter component props
 * @interface ShaAuthFooterProps
 * @property {string} message - The main text message to display
 * @property {string} linkText - The text for the clickable link
 * @property {() => void} onLinkPress - Callback function when link is pressed
 */
interface ShaAuthFooterProps {
  message: string;
  linkText: string;
  onLinkPress: () => void;
}

/**
 * A footer component specifically designed for authentication screens.
 * Typically used to provide navigation between related auth screens
 * (e.g., Login → Sign Up, Sign Up → Login).
 *
 * Usage:
 * ```
 * <ShaAuthFooter
 *   message="Don't have an account?"
 *   linkText="Sign up"
 *   onLinkPress={() => navigation.navigate('SignUp')}
 * />
 * ```
 */
export const ShaAuthFooter: React.FC<ShaAuthFooterProps> = ({
  message,
  linkText,
  onLinkPress,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.footer}>
      <Text
        style={[
          styles.footerText,
          {
            fontSize: responsiveFontSize(14),
            color: theme.colors.onSurfaceVariant,
          },
        ]}>
        {message} {/* Clickable link portion */}
        <Text
          style={[styles.footerLink, {color: theme.colors.primary}]}
          onPress={onLinkPress}>
          {linkText}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  footerText: {
    fontWeight: '400',
  },
  footerLink: {
    fontWeight: '600',
  },
});
