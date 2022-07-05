import * as React from 'react';
import { PropTypes } from './types';
import { Toolbar, Container, Typography, Box } from '@mui/material';
import styles from './styles.module.css';

const Footer: React.FC<PropTypes> = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box width={'100%'}>
            <Typography textAlign={'center'}>by Vlad Olishynskyi</Typography>
          </Box>
        </Toolbar>
      </Container>
    </footer>
  );
};

export default Footer;
