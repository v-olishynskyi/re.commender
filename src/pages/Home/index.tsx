import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const navigation = useNavigate();

  const onClickTry = React.useCallback(() => {
    navigation('/randomizer');
  }, [navigation]);

  return (
    <Box component='section'>
      <Typography variant='h4' component={'h1'}>
        Re.commender
        <Typography
          component={'span'}
          variant='h5'
          sx={{ verticalAlign: 'middle' }}>
          - сервіс за допомогою якого ви можете знайти фільм для перегляду на
          вечір. Підбір відбувається на основі вибраних вами фільмів* або по
          фільтрах (жанр/країна/рік випуску і тп.)
        </Typography>
      </Typography>
      <Button variant='contained' sx={{ mt: 2 }} onClick={onClickTry}>
        Спробувати
      </Button>

      <Typography
        component={'span'}
        variant='caption'
        sx={{
          position: 'absolute',
          bottom: theme.spacing(4),
          left: theme.spacing(2),
        }}>
        * - лише для авторизованих користувачів
      </Typography>
    </Box>
  );
};

export default HomePage;
