import * as React from 'react';
import { Box, useTheme } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, NavLink } from 'react-router-dom';

export const DesktopHeader = () => {
  const theme = useTheme();

  return (
    <>
      <AdbIcon sx={{ mr: 1 }} />
      <Link
        to={'/'}
        style={{
          fontWeight: 700,
          marginRight: theme.spacing(2),
          fontFamily: 'monospace',
          color: theme.palette.text.primary,
          fontSize: 22,
          textDecoration: 'none',
        }}>
        RE.COMMENDER
      </Link>
      <Box sx={{ flexGrow: 1 }}>
        <NavLink
          to='/'
          style={({ isActive }) => ({
            marginRight: theme.spacing(2),
            fontWeight: 'bold',
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            textDecoration: 'none',
          })}>
          ГОЛОВНА
        </NavLink>
        <NavLink
          to='/randomizer'
          style={({ isActive }) => ({
            marginRight: theme.spacing(2),
            fontWeight: 'bold',
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            textDecoration: 'none',
          })}>
          ВИПАДКОВИЙ ФІЛЬМ
        </NavLink>
        <NavLink
          to='/library'
          style={({ isActive }) => ({
            marginRight: theme.spacing(2),
            fontWeight: 'bold',
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            textDecoration: 'none',
          })}>
          МОЯ БІБЛІОТЕКА
        </NavLink>
      </Box>
    </>
  );
};

export default DesktopHeader;
