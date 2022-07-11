import * as React from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const TabletHeader = () => {
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
      <AdbIcon />
      <Link
        to={'/'}
        style={{
          fontWeight: 700,
          marginRight: theme.spacing(1),
          fontFamily: 'monospace',
          color: theme.palette.text.primary,
          fontSize: 20,
          textDecoration: 'none',
          flexGrow: 1,
        }}>
        RE.COMMENDER
      </Link>
    </>
  );
};

export default TabletHeader;
