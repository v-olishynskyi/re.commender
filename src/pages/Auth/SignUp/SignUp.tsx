import React from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firebaseDB } from '../../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';

const SignUp = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoading(true);
      const data = new FormData(event.currentTarget);

      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        String(data.get('email')),
        String(data.get('password'))
      );

      const user = userCredential.user;

      await addDoc(collection(firebaseDB, 'users'), {
        uid: user.uid,
        email: String(data.get('email')),
        name: String(data.get('firstName')),
        family_name: String(data.get('lastName')),
        authProvider: 'local',
        isAnonymous: false,
      });

      setLoading(false);
    } catch (error: any) {
      console.log('SignUp.tsx handleSubmit error', error);
      setLoading(false);

      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
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
          Реєстрація
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Імʼя'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Прізвище'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                type='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Пароль'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Підтвердження паролю'
                type='password'
                id='confirm-password'
                autoComplete='new-password'
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid> */}
          </Grid>
          {loading ? (
            <Grid container justifyContent='center'>
              <CircularProgress sx={{ mt: 3, mb: 2 }} />
            </Grid>
          ) : (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Зареєструватися
            </Button>
          )}
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/login' style={{ color: theme.palette.primary.main }}>
                Вже маєте аккаунт? Увійти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
