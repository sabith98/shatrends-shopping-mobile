import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {Control, Controller} from 'react-hook-form';
import {spacing, responsiveFontSize, moderateScale} from '@utils/responsive';


interface ShaTextInputProps {
  name: string;
  control: Control<any>;
  icon?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rightIcon?: {
    name: string;
    onPress?: () => void;
  };
  error?: string;
  keyboardType?: string;
}

/**
 * @example
 * ```jsx
 * <ShaTextInput
 *   name="email"
 *   control={control}
 *   icon="email"
 *   placeholder="Enter your email"
 *   error={errors.email?.message}
 *   keyboardType="email-address"
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
  keyboardType,
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
            style={[styles.input, {height: moderateScale(48)}]}
            outlineStyle={{
              borderRadius: moderateScale(8),
              borderWidth: 1,
            }}
            theme={{
              colors: {
                primary: theme.colors.primary,
                onSurfaceVariant: theme.colors.onSurfaceVariant,
                outline: theme.colors.outline,
              },
              roundness: moderateScale(8),
            }}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            left={
              <TextInput.Icon
                icon={icon}
                size={moderateScale(20)}
                color={({focused}: {focused: boolean}) =>
                  focused ? theme.colors.primary : theme.colors.onSurfaceVariant
                }
              />
            }
            right={
              rightIcon && (
                <TextInput.Icon
                  icon={rightIcon.name}
                  size={moderateScale(20)}
                  onPress={rightIcon.onPress}
                  color={theme.colors.onSurfaceVariant}
                />
              )
            }
            placeholder={placeholder}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />
        )}
      />
      {/* Error message display */}
      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.colors.error,
              fontSize: responsiveFontSize(12),
            },
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: moderateScale(12),
  },
  input: {
    fontSize: responsiveFontSize(14),
    backgroundColor: 'transparent',
  },
  errorText: {
    marginTop: moderateScale(4),
    marginLeft: moderateScale(4),
  },
});
