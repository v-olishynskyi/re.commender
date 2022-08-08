import React from 'react';
import { Container, useTheme } from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { SnackbarProvider } from 'notistack';
import { useNavigate } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import { Header } from './components/Header';
import AppRouter from './navigation/AppRouter';
import { firebaseAuth } from './firebase/firebase';
import { getUserDoc } from './api/firebaseRequests';
import userAtom from './recoil/userStore';
import { UserType } from './types';

function App() {
  const theme = useTheme();
  const navigate = useNavigate();

  // RECOIL
  const [user, setUser] = useRecoilState(userAtom);
  const resetUserState = useResetRecoilState(userAtom);
  console.log('USER', user);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, async fbUser => {
      try {
        console.log('FIREBASE user', fbUser);
        if (fbUser) {
          setUser({ ...user, loading: true, error: null });
          const userDocData = (await getUserDoc(fbUser.uid, true)) as UserType;

          setUser({
            loading: false,
            user: {
              ...userDocData,
            },
            error: null,
          });

          if (!userDocData?.isAlreadyChooseMovies) {
            navigate('/chooseLikedMovies', { replace: true });
          }

          return;
        }

        return resetUserState();
      } catch (error: any) {
        console.log('FIREBASE AUTH ERROR', error);
        setUser({ ...user, loading: false, error: error.message || error });
      }
    });
  }, [setUser, resetUserState, navigate]);

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
