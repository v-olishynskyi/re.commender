import { Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useLocalStorage } from 'react-use';
import { darkTheme, lightTheme } from '../theme';

export type ColorSchemes = 'dark' | 'light';

type CustomThemeContextType = {
  theme: Theme;
  mode: ColorSchemes;
  toggleTheme: VoidFunction;
  dark: boolean;
};

export const CustomThemeContext = React.createContext<CustomThemeContextType>(
  null!
);

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStorageThemeValue] = useLocalStorage<ColorSchemes>('theme');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState<ColorSchemes>(
    localStorageThemeValue
      ? localStorageThemeValue
      : prefersDarkMode
      ? 'dark'
      : 'light'
  );

  const toggleTheme = () =>
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  const theme = React.useMemo(() => {
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  const dark = React.useMemo(() => {
    return mode === 'dark';
  }, [mode]);

  const value = { mode, toggleTheme, theme, dark };

  return (
    <CustomThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
