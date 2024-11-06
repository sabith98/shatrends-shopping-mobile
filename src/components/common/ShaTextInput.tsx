import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {Control, Controller} from 'react-hook-form';
import {spacing, responsiveFontSize, moderateScale} from '@utils/responsive';

/**
 * Interface for the ShaTextInput component props
 * @interface ShaTextInputProps
 * @property {string} name - Field name for form control
 * @property {Control<any>} control - React Hook Form control object
 * @property {string} icon - Name of the icon to display on the left side
 * @property {string} placeholder - Placeholder text for the input
 * @property {boolean} [secureTextEntry] - Whether to hide text input (for passwords)
 * @property {Object} [rightIcon] - Configuration for optional right icon
 * @property {string} rightIcon.name - Name of the right icon
 * @property {() => void} [rightIcon.onPress] - Callback function for right icon press
 * @property {string} [error] - Error message to display below input
 */
interface ShaTextInputProps {
  name: string;
  control: Control<any>;
  icon: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rightIcon?: {
    name: string;
    onPress?: () => void;
  };
  error?: string;
}

/**
 * A custom text input component that integrates with React Hook Form and React Native Paper.
 * Includes support for icons, error states, and secure text entry.
 *
 * @component
 * @example
 * ```
 * <ShaTextInput
 *   name="email"
 *   control={control}
 *   icon="email"
 *   placeholder="Enter your email"
 *   error={errors.email?.message}
 * />
 * ```
 */
export const ShaTextInput: React.FC<ShaTextInputProps> = ({
  name,
  control,
  icon,
  placeholder,
  secureTextEntry,
  rightIcon,
  error,
}) => {
  // Access theme context for consistent styling
  const theme = useTheme();

  return (
    <View style={styles.inputContainer}>
      {/* Controller component from react-hook-form to manage form state */}
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[styles.input, {height: moderateScale(56)}]}
            outlineStyle={{borderRadius: 8}}
            secureTextEntry={secureTextEntry}
            // Configure left icon with dynamic color based on focus state
            left={
              <TextInput.Icon
                icon={icon}
                color={(focused: boolean) =>
                  focused ? theme.colors.primary : theme.colors.onSurfaceVariant
                }
              />
            }
            // Optional right icon configuration
            right={
              rightIcon && (
                <TextInput.Icon
                  icon={rightIcon.name}
                  onPress={rightIcon.onPress}
                  color={theme.colors.onSurfaceVariant}
                />
              )
            }
            placeholder={placeholder}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            theme={{
              colors: {
                primary: theme.colors.primary,
                onSurfaceVariant: theme.colors.onSurfaceVariant,
              },
            }}
            error={!!error}
          />
        )}
      />
      {/* Error message display */}
      {error && (
        <Text style={[styles.errorText, {color: theme.colors.error}]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: spacing.md,
  },
  input: {
    width: '100%',
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: responsiveFontSize(12),
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
});
