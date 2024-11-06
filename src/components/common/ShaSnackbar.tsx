import React, {useState, useEffect} from 'react';
import {Snackbar, useTheme} from 'react-native-paper';


/**
 * Interface for the ShaSnackbar component props
 * @interface ShaSnackbarProps
 * @property {string} [message] - The message to display in the snackbar
 * @property {'success' | 'error' | 'info' | 'warning'} [type] - The type of snackbar which determines its appearance
 * @property {boolean} visible - Controls the visibility of the snackbar
 * @property {() => void} onDismiss - Callback function called when the snackbar is dismissed
 * @property {number} [duration] - Duration in milliseconds for which the snackbar is visible
 */
interface ShaSnackbarProps {
  message?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

/**
 * A customizable snackbar component that supports different types of notifications
 * with configurable duration and appearance based on the current theme.
 *
 * @component
 * @example
 * ```
 * <ShaSnackbar
 *   message="Operation successful!"
 *   type="success"
 *   visible={showSnackbar}  // set showSnackbar boolean state variable
 *   onDismiss={() => setShowSnackbar(false)}
 *   duration={5000}
 * />
 * ```
 */
export const ShaSnackbar: React.FC<ShaSnackbarProps> = ({
  message = '',
  type = 'info',
  visible,
  onDismiss,
  duration = 3000,
}) => {
  const theme = useTheme(); // Access theme for consistent styling
  const [snackbarVisible, setSnackbarVisible] = useState(visible);

  /**
   * Set Snackbar visibility based on the `visible` prop.
   */
  useEffect(() => {
    setSnackbarVisible(visible);
  }, [visible]);

  /**
   * Determines the background color of the snackbar based on its type
   * @returns {Object} Style object containing the background color
   */
  const getSnackbarStyle = () => {
    switch (type) {
      case 'success':
        return {backgroundColor: theme.colors.primary};
      case 'error':
        return {backgroundColor: theme.colors.error};
      case 'warning':
        return {backgroundColor: theme.colors.tertiary};
      case 'info':
      default:
        return {backgroundColor: theme.colors.onSurface};
    }
  };

  return (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => {
        setSnackbarVisible(false);
        onDismiss();
      }}
      duration={duration}
      style={getSnackbarStyle()}>
      {message}
    </Snackbar>
  );
};
