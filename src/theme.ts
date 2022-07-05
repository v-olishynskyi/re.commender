import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5c518',
    },
    secondary: {
      main: '#76b4ff',
    },
    background: {
      paper: '#121212',
      default: '#121212',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.6)',
      disabled: 'rgba(255,255,255,0.38)',
    },
    error: {
      main: '#cf6679',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#fff', paper: 'fff' },
  },
});
