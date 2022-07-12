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
import { useSnackbar } from 'notistack';
import { signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';

import { firebaseAuth } from '../../../firebase/firebase';

const SignIn = () => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);

      await signInWithEmailAndPassword(
        firebaseAuth,
        String(data.get('email')),
        String(data.get('password'))
      );

      setLoading(false);
      navigation('/randomizer', { replace: true });
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  const onSingInAnonymously = async () => {
    await signInAnonymously(firebaseAuth);
    navigation('/randomizer', { replace: true });
  };

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
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 0 }}>
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
