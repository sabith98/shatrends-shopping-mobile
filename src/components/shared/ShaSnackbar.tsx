import React, {useState, useEffect} from 'react';
import {Snackbar, useTheme} from 'react-native-paper';

interface ShaSnackbarProps {
  /** The message to display in the Snackbar */
  message?: string;

  /** The type of Snackbar message to display:
   * - success: for successful actions
   * - error: for error notifications
   * - info: for informational messages
   * - warning: for cautionary notes
   */
  type?: 'success' | 'error' | 'info' | 'warning';

  /** Boolean to control the visibility of the Snackbar */
  visible: boolean;

  /** Function to handle the dismissal of the Snackbar */
  onDismiss: () => void;

  /** Duration in milliseconds for which the Snackbar will be visible (default: 3000ms) */
  duration?: number;
}

/**
 * ShaSnackbar component - a reusable, customizable Snackbar for displaying notifications across the app.
 *
 * This component is designed to provide consistent feedback to users by showing messages for different types
 * (success, error, info, warning) with distinct styles. Ideal for use throughout the app to ensure consistency.
 */
export const ShaSnackbar: React.FC<ShaSnackbarProps> = ({
  message = '',
  type = 'info',
  visible,
  onDismiss,
  duration = 3000,
}) => {
  const theme = useTheme(); // Access the current theme for styling
  const [snackbarVisible, setSnackbarVisible] = useState(visible);

  /**
   * Set Snackbar visibility based on the `visible` prop.
   */
  useEffect(() => {
    setSnackbarVisible(visible);
  }, [visible]);

  /**
   * Get the background color style based on the message type.
   * @returns {object} A style object with the appropriate background color.
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
