import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {spacing, responsiveFontSize} from '@utils/responsive';

/**
 * Interface for the ShaDivider component props
 * @interface ShaDividerProps
 * @property {string} text - Text to display in the center of the divider
 */
interface ShaDividerProps {
  text: string;
}

/**
 * A horizontal divider component that displays text between two lines.
 * Commonly used to separate content sections or provide alternative options
 * (e.g., "or", "and").
 *
 * @component
 * @example
 * ```
 * // Basic usage
 * <ShaDivider text="or" />
 *
 * // Usage in a form
 * <LoginForm />
 * <ShaDivider text="or continue with" />
 * <SocialLoginButtons />
 * ```
 */
export const ShaDivider: React.FC<ShaDividerProps> = ({text}) => {
  const theme = useTheme(); // Access theme for consistent styling

  return (
    <View style={styles.divider}>
      {/* Left divider line */}
      <View
        style={[styles.dividerLine, {backgroundColor: theme.colors.outline}]}
      />

      {/* Center text */}
      <Text
        style={[
          styles.dividerText,
          {
            fontSize: responsiveFontSize(14),
            color: theme.colors.onSurfaceVariant,
          },
        ]}>
        {text}
      </Text>

      {/* Right divider line */}
      <View
        style={[styles.dividerLine, {backgroundColor: theme.colors.outline}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontWeight: '400',
  },
});
