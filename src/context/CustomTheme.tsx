import { Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { darkTheme, lightTheme } from '../theme';

type CustomThemeContextType = {
  theme: Theme;
  dark: boolean;
  toggleTheme: VoidFunction;
};

export const CustomThemeContext = React.createContext<CustomThemeContextType>(
  null!
);

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [dark, setDark] = React.useState(prefersDarkMode);

  const toggleTheme = () => setDark(prev => !prev);

  const theme = React.useMemo(() => {
    return dark ? darkTheme : lightTheme;
  }, [dark]);

  const value = { dark, toggleTheme, theme };

  return (
    <CustomThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
