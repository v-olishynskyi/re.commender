import { IconButton, SxProps, Theme, Tooltip } from '@mui/material';
import React from 'react';
import { useLocalStorage } from 'react-use';
import LightIcon from '@mui/icons-material/LightMode';
import DarkIcon from '@mui/icons-material/DarkMode';

import { useToggleTheme } from '../../hooks/useToggleTheme';

type Props = {
  sx?: SxProps<Theme>;
};

const ToggleThemeButton = ({ sx }: Props) => {
  const { dark, toggleTheme } = useToggleTheme();
  const [, setThemeStorageValue] = useLocalStorage(
    'theme',
    dark ? 'dark' : 'light'
  );
  const onToggleTheme = React.useCallback(() => {
    dark ? setThemeStorageValue('light') : setThemeStorageValue('dark');
    toggleTheme();
  }, [toggleTheme, dark, setThemeStorageValue]);

  return (
    <Tooltip title={dark ? 'Light mode' : 'Dark mode'}>
      <IconButton onClick={onToggleTheme} sx={{ p: 0, ...sx }}>
        {dark ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleThemeButton;
