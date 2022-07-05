import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import { ToggleThemeButton } from '../Buttons';

import { PropTypes } from './types';
import { firebaseAuth } from '../../firebase/firebase';

const TabletHeader: React.FC<PropTypes> = () => {
  const theme = useTheme();

  const [user] = useAuthState(firebaseAuth);
  const navigation = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
      <Box sx={{ flexGrow: 0 }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}>
          <MenuItem>
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
          </MenuItem>
          <MenuItem>
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
          </MenuItem>
          <MenuItem>
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
          </MenuItem>
          <MenuItem>
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
          </MenuItem>
        </Menu>
      </Box>
      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant='h5'
        component='span'
        sx={{
          mr: 1,
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
        }}
        fontSize={20}>
        RE.COMMENDER
      </Typography>

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

export default TabletHeader;
