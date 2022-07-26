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
import { getUserDocData } from './api/firebaseRequests';
import userAtom from './recoil/userStore';

function App() {
  const theme = useTheme();

  // RECOIL
  const [user, setUser] = useRecoilState(userAtom);
  const resetCurrentUserState = useResetRecoilState(userAtom);
  console.log('USER', user);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, async user => {
      if (user) {
        const userDocData = await getUserDocData(user.uid);

        setUser({
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
  }, [setUser, resetCurrentUserState]);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={4000}>
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
