import * as React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SignOutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSnackbar } from 'notistack';

import MobileHeader from './MobileHeader';
import TabletHeader from './TabletHeader';
import DesktopHeader from './DesktopHeader';
import { ToggleThemeButton } from '../Buttons';
import { firebaseAuth } from '../../firebase/firebase';
import { makeAvatarLetters } from '../../utils/startCase';
import { stringAvatar } from '../../utils/stringAvatars';
import userAtom from '../../recoil/userStore';

export const Header = () => {
  const theme = useTheme();
  const navigation = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useRecoilValue(userAtom);
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const [, loading] = useAuthState(firebaseAuth);

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
    navigation('/login', { state: { from: location } });
  };

  const handleCLickSignOut = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error: any) {
      console.log(
        '🚀 ~ file: index.tsx ~ line 58 ~ handleCLickSignOut ~ error',
        error
      );

      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  return (
    <AppBar
      position='sticky'
      sx={{ bgcolor: 'background.default', color: 'text.primary', top: 0 }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {isPhone ? (
            <MobileHeader />
          ) : isTablet ? (
            <TabletHeader />
          ) : (
            <DesktopHeader />
          )}
          <Box sx={{ flexGrow: 0 }}>
            <ToggleThemeButton sx={{ mr: 2 }} />
            {user ? (
              <>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src='/static/images/avatar/2.jpg'
                      sx={{
                        ...stringAvatar(`${user!.name} ${user!.family_name}`),
                      }}>
                      {user.isAnonymous
                        ? 'AN'
                        : makeAvatarLetters(`${user.name} ${user.family_name}`)}
                    </Avatar>
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
                  onClose={handleCloseUserMenu}>
                  <MenuItem>
                    <ProfileIcon sx={{ mr: 1 }} />
                    <NavLink
                      to='/profile'
                      style={({ isActive }) => ({
                        marginRight: theme.spacing(2),
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                        textDecoration: 'none',
                      })}>
                      Профіль
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <SettingsIcon sx={{ mr: 1 }} />
                    <NavLink
                      to='/'
                      style={({ isActive }) => ({
                        marginRight: theme.spacing(2),
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                        textDecoration: 'none',
                      })}>
                      Налаштування
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleCLickSignOut}>
                    <SignOutIcon sx={{ mr: 1 }} />
                    Вийти
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {loading ? (
                  <CircularProgress />
                ) : isPhone ? (
                  <IconButton onClick={handleClickSignIn}>
                    <LoginIcon color={'primary'} />
                  </IconButton>
                ) : (
                  <Button variant='outlined' onClick={handleClickSignIn}>
                    Увійти
                  </Button>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
