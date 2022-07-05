import * as React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { PropTypes } from './types';
import MobileHeader from './MobileHeader';
import TabletHeader from './TabletHeader';
import DesktopHeader from './DesktopHeader';

export const Header: React.FC<PropTypes> = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position='fixed'
      sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {isPhone ? (
            <MobileHeader />
          ) : isTablet ? (
            <TabletHeader />
          ) : (
            <DesktopHeader />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
