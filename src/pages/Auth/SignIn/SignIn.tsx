import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../../firebase/firebase';
import { useSnackbar } from 'notistack';
import { currentUserRecoilState } from '../../../store';
import { useRecoilState } from 'recoil';

import { getUserDocData } from '../../../api/firebaseRequests';

const SignIn = () => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [currentUserState, setCurrentUserState] = useRecoilState(
    currentUserRecoilState
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setCurrentUserState({ ...currentUserState, loading: true });
      const data = new FormData(event.currentTarget);
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        String(data.get('email')),
        String(data.get('password'))
      );

      const userDocData = await getUserDocData(userCredential.user.uid);

      setCurrentUserState({
        loading: false,
        user: {
          ...userDocData,
        },
        error: null,
      });

      setCurrentUserState({ ...currentUserState, loading: false });
      navigation('/randomizer');
    } catch (error: any) {
      setCurrentUserState({ ...currentUserState, loading: false });
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  const onSingInAnonymously = async () => {
    await signInAnonymously(firebaseAuth);
    navigation('/randomizer', { replace: true });
  };

  React.useEffect(() => {
    if (currentUserState.user) navigation('/randomizer');
  }, [currentUserState, navigation]);

  return (
    <Container maxWidth={'xs'} disableGutters>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Вхід
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            type='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Запамʼятати мене'
          />
          {currentUserState.loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 0 }}
                disabled={currentUserState.loading}>
                Увійти
              </Button>
              <Button
                fullWidth
                variant='outlined'
                sx={{ mt: 2, mb: 2 }}
                onClick={onSingInAnonymously}>
                Увійти анонімно
              </Button>
            </>
          )}
          <Grid container>
            <Grid item xs>
              <Link to='#' style={{ color: 'primary.main' }}>
                Забули пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' style={{ color: 'primary.main' }}>
                {`Ще не зареєстровані?\nЗареєструватися`}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
