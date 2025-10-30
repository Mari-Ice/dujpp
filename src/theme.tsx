import { createTheme, type ThemeOptions } from '@mui/material/styles';

// --- 1. Custom Colors and Dimens (Kept separate but simplified) ---

export abstract class DujppColors {
  static contentShade = '#6a696e'; // textSecondary / iconPrimary
  static content = '#3a383c';      // textPrimary
  static content50 = 'rgba(58,56,60,0.5)';
  static primary = '#69d19d';      // primary
  static primaryDark = '#61ab6f';
  static neutral = '#FFFFFF';      // background.default, paper
  static shade = '#f2f2f2';        // background.light
  static idle = '#d7d7d7';         // action.disabled
  static error = '#e24a4a';        // error
}

export interface CustomDimens {
  contentWidth: string;
}

// 2. Define Module Augmentation for custom properties (Dimens)
// This lets TypeScript know that the MUI Theme object has your custom Dimens.
declare module '@mui/material/styles' {
  interface Theme {
    dimens: CustomDimens;
    content: string; // Add your custom color properties to the theme interface
    contentShade: string;
    content50: string;
    // ... add others if you use them directly from theme
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    dimens?: CustomDimens;
    content?: string;
    contentShade?: string;
    content50?: string;
  }
}

// --- 3. MUI Theme Configuration (DujppThemeOptions) ---

const DujppThemeOptions: ThemeOptions = {
  // Add custom properties here
  dimens: {
    contentWidth: '500px',
  },
  content: DujppColors.content, // custom color property
  contentShade: DujppColors.contentShade, // custom color property
  content50: DujppColors.content50, // custom color property

  // MUI standard properties
  palette: {
    primary: {
      main: DujppColors.primary,
      dark: DujppColors.primaryDark,
      contrastText: DujppColors.content, // or white, depending on your design
    },
    error: {
      main: DujppColors.error,
    },
    background: {
      default: DujppColors.neutral,
      paper: DujppColors.neutral,
    },
    text: {
      primary: DujppColors.content,
      secondary: DujppColors.contentShade,
      disabled: DujppColors.idle,
    },
  },

  // Map your custom TextTheme to MUI's standard typography variants
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','), // Example font family

    h1: { // Corresponds to your 'headline1'
      fontSize: '60px',
      fontWeight: 'bold',
      color: DujppColors.content,
    },
    h2: { // Corresponds to your 'headline2'
      fontSize: '40px',
      fontWeight: '300',
      color: DujppColors.content,
    },
    h3: { // Corresponds to your 'headline3'
      fontSize: '30px',
      fontWeight: '400',
    },
    h4: { // Corresponds to your 'headline4'
      fontSize: '23px',
      fontWeight: '400',
    },
    h5: { // Corresponds to your 'headline5'
      fontSize: '20px',
      fontWeight: '700',
    },
    h6: { // Corresponds to your 'headline6'
      fontSize: '15px',
      fontWeight: 'bold',
    },
    subtitle1: { // Corresponds to your 'label' or another distinct style
      fontSize: '15px',
      fontWeight: '600',
      color: DujppColors.contentShade,
    },
    body1: { // Corresponds to your 'body'
      fontSize: '13px',
      fontWeight: '400',
      color: DujppColors.content,
    },
    button: { // Corresponds to your 'button'
      fontSize: '15px',
      fontWeight: 'bold',
      color: DujppColors.content,
      textTransform: 'none', // Often desired for custom designs
    },
    caption: { // Can be used for small, error, or input placeholder text
      fontSize: '15px',
      color: DujppColors.error, // Could be your 'error' style
    }
  },

  // Mui components can be customized globally here
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Example: Apply 'button' typography style
          ...({} as any), // Use spread for cleaner application
        },
      },
      defaultProps: {
        disableElevation: true,
      }
    }
    // You can customize DatePicker components here too
  }
};

// --- 4. Export the final theme object created by MUI's factory function ---

/**
 * The final MUI Theme object for the application.
 * Use this with <ThemeProvider theme={DujppTheme} />
 */
export const DujppTheme = createTheme(DujppThemeOptions);