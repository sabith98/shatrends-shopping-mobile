import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 6, // Default border radius for buttons, inputs, etc.
  colors: {
    ...DefaultTheme.colors,

    // Primary brand color (used for primary buttons, links, etc.)
    primary: '#FF6F61',

    // Secondary color for accents and highlights
    accent: '#4CAF50',

    // Background for the entire app
    background: '#F5F5F5',

    // Surface color for cards, modals, etc.
    surface: '#FFFFFF',

    // Default text color
    text: '#212121',

    // Success state color (e.g., for confirmation)
    success: '#4CAF50',

    // Error state color (e.g., form validation errors)
    error: '#F44336',

    // Warning state color (e.g., for alerts)
    warning: '#FFC107',

    // Info state color (e.g., for informational banners)
    info: '#2196F3',

    // Placeholder color for inputs
    placeholder: '#9E9E9E',

    // Disabled state color for buttons, inputs, etc.
    disabled: '#BDBDBD',

    // Color for borders (input fields, card borders, etc.)
    border: '#E0E0E0',

    // Default text color when placed on primary background
    onPrimary: '#FFFFFF',

    // Default text color when placed on a surface background
    onSurface: '#000000',

    // App bar or header background color
    appBarBackground: '#FF6F61',

    // Icon colors used in buttons or inputs
    icon: '#757575',

    // Divider lines color
    divider: '#BDBDBD',

    // Shadows (not directly used by Paper but a useful reference for eCommerce)
    shadow: 'rgba(0, 0, 0, 0.2)',
  },
};

export default theme;
