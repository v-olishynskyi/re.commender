import { ThemeProvider, useMediaQuery } from '@mui/material';
import React from 'react';
import './App.css';
import Footer from './components/Footer';
import { Header } from './components/Header';
import CustomThemeProvider from './context/CustomTheme';
import AppRouter from './navigation/AppRouter';

function App() {
  return (
    <div className='App'>
      <CustomThemeProvider>
        <Header />
        <AppRouter />
        <Footer />
      </CustomThemeProvider>
    </div>
  );
}

export default App;
