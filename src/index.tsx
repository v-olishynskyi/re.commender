import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import CustomThemeProvider from './context/CustomTheme';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <React.Suspense
          fallback={
            <Box
              sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CircularProgress />
            </Box>
          }>
          <ErrorBoundary>
            <CustomThemeProvider>
              <CssBaseline />
              <App />
            </CustomThemeProvider>
          </ErrorBoundary>
        </React.Suspense>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
