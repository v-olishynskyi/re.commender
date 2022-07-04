import * as React from 'react';
import { PropTypes } from './types';
import { Toolbar, Container } from '@mui/material';

const Footer: React.FC<PropTypes> = () => {
  return (
    <footer className=''>
      <Container maxWidth='xl'>
        <Toolbar disableGutters></Toolbar>
      </Container>
    </footer>
  );
};

export default Footer;
