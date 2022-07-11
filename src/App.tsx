import React from 'react';
import { Container, useTheme } from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { SnackbarProvider } from 'notistack';

import './App.css';
import Footer from './components/Footer';
import { Header } from './components/Header';
import AppRouter from './navigation/AppRouter';
import { firebaseAuth } from './firebase/firebase';
import { currentUserRecoilState } from './store';
import { getUserDocData } from './api/firebaseRequests';

function App() {
  const theme = useTheme();

  // RECOIL
  const [currentUserState, setCurrentUserState] = useRecoilState(
    currentUserRecoilState
  );
  const resetCurrentUserState = useResetRecoilState(currentUserRecoilState);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, async user => {
      if (user) {
        setCurrentUserState({ ...currentUserState, loading: true });
        const userDocData = await getUserDocData(user.uid);

        setCurrentUserState({
          loading: false,
          user: {
            ...userDocData,
          },
          error: null,
        });

        return;
      }

      return resetCurrentUserState();
    });
  }, [setCurrentUserState, resetCurrentUserState, currentUserState]);

  return (
    <SnackbarProvider maxSnack={3}>
      <div className='App'>
        <Header />
        <Container
          component={'main'}
          className='Site-content'
          maxWidth='xl'
          sx={{
            flex: 1,
            backgroundColor: theme.palette.background.default,
            py: 4,
            position: 'relative',
          }}>
          <AppRouter />
        </Container>
        <Footer />

        {/* <GlobalSnackbar /> */}
      </div>
    </SnackbarProvider>
  );
}

export default App;
