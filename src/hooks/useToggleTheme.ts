import React from 'react';
import { CustomThemeContext } from '../context/CustomTheme';

export function useToggleTheme() {
  const context = React.useContext(CustomThemeContext);

  if (!context) {
    throw new Error(
      'useCustomThemeContext must be used within an CustomThemeProvider'
    );
  }

  return context;
}
