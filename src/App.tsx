import React from 'react';
import { Container, useTheme } from '@mui/material';
import { RecoilRoot } from 'recoil';

import './App.css';
import Footer from './components/Footer';
import { Header } from './components/Header';
import AppRouter from './navigation/AppRouter';

function App() {
  const theme = useTheme();

  return (
    <RecoilRoot>
      <div className='App'>
        <Header />
        <Container
          component={'main'}
          className='Site-content'
          maxWidth='xl'
          sx={{ flex: 1, backgroundColor: theme.palette.background.default }}>
          <AppRouter />
        </Container>
        <Footer />
      </div>
    </RecoilRoot>
  );
}

export default App;
