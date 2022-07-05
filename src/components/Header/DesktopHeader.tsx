import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router-dom';

import { ToggleThemeButton } from '../Buttons';
import { firebaseAuth } from '../../firebase/firebase';

export const DesktopHeader = () => {
  const theme = useTheme();
  const [user] = useAuthState(firebaseAuth);
  const navigation = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSignIn = () => {
    navigation('/login');
  };

  return (
    <>
      <AdbIcon sx={{ mr: 1 }} />
      <Typography
        variant='h5'
        component='span'
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
        }}>
        RE.COMMENDER
      </Typography>
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
          HOME
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
          LIBRARY
        </NavLink>
        <NavLink
          to='/profile'
          style={({ isActive }) => ({
            marginRight: theme.spacing(2),
            fontWeight: 'bold',
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            textDecoration: 'none',
          })}>
          PROFILE
        </NavLink>
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <ToggleThemeButton sx={{ mr: 2 }} />
        {user ? (
          <>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}></Menu>
          </>
        ) : (
          <Button variant='outlined' onClick={handleClickSignIn}>
            Увійти
          </Button>
        )}
      </Box>
    </>
  );
};

export default DesktopHeader;
