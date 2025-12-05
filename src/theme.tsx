import { createTheme, type ThemeOptions } from '@mui/material/styles';
import '@fontsource/barlow/300.css'; // Light
import '@fontsource/barlow/400.css'; // Regular
import '@fontsource/barlow/500.css'; // Medium
import '@fontsource/barlow/700.css'; // Bold

// --- 1. Custom Colors and Dimens (Kept separate but simplified) ---

export abstract class DujppColors {
  static contentShade = '#d5d5d5'; // textSecondary / iconPrimary
  static content = '#08152c';      // textPrimary
  static content50 = '#163446';
  static contentNeutral = '#002623';
  static primary = '#004a8a';      // primary
  static primaryDark = '#004a8a';
  static primaryLight = '#446da5';
  static secondary = '#8ac63e';
  static secondaryLight = '#aed474';
  static neutral = '#FFFFFF';      // background.default, paper
  static shade = '#dbe0e6';        // background.light
  static idle = '#d7d7d7';         // action.disabled
  static error = '#c83f3f';        // error
}

export interface CustomDimens {
  contentWidth: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    dimens: CustomDimens;
    content: string;
    contentShade: string;
    content50: string;
  }

  interface ThemeOptions {
    dimens?: CustomDimens;
    content?: string;
    contentShade?: string;
    content50?: string;
  }
}


const DujppThemeOptions: ThemeOptions = {
  dimens: {
    contentWidth: '500px',
  },
  content: DujppColors.content,
  contentShade: DujppColors.contentShade,
  content50: DujppColors.content50,

  palette: {
    primary: {
      main: DujppColors.primary,
      dark: DujppColors.primaryDark,
      light: DujppColors.primaryLight,
      contrastText: DujppColors.neutral,
    },
    secondary: {
      main: DujppColors.secondary,
      dark: DujppColors.secondary,
      light: DujppColors.secondaryLight,
      contrastText: DujppColors.neutral,
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


  typography: {
    fontFamily: ['Barlow', 'Roboto', 'Arial', 'sans-serif'].join(','),

    h1: {
      fontSize: '60px',
      fontWeight: 'bold',
      color: DujppColors.content,
    },
    h2: {
      fontSize: '40px',
      fontWeight: '300',
      color: DujppColors.content,
    },
    h3: {
      fontSize: '30px',
      fontWeight: '400',
    },
    h4: {
      fontSize: '23px',
      fontWeight: '400',
    },
    h5: {
      fontSize: '20px',
      fontWeight: '700',
    },
    h6: {
      fontSize: '15px',
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: '15px',
      fontWeight: '600',
      color: DujppColors.contentShade,
    },
    body1: {
      fontSize: '13px',
      fontWeight: '400',
      color: DujppColors.content,
    },
    button: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: DujppColors.content,
      textTransform: 'none',
    },
    caption: {
      fontSize: '15px',
      color: DujppColors.error,
    }
  },

  components: {
    MuiIconButton: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.palette.primary.main,
          // Define styles for the hover state
          '&:hover': {
            // color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.light + '50',
          },
        }),
      },
    },
  },
};

/**
 * The final MUI Theme object for the application.
 * Use this with <ThemeProvider theme={DujppTheme} />
 */
export const DujppTheme = createTheme(DujppThemeOptions);

export const datePickerSlotProps = {
  toolbar: {
    sx: {
      span: {
        color: DujppColors.content,
      },
      'span[data-selected="true"]': {
        color: DujppColors.primary,
        fontWeight: 'bold',
      },
    }
  },
  tabs: {
    sx: {
      button: {
        color: DujppColors.idle
      },
      'button[aria-selected="true"]': {
        color: DujppColors.primary
      }
    }
  },
  weekdays: {
    sx: {
      'span.MuiDayCalendar-weekDayLabel': {color: DujppColors.content}
    }
  }
};
