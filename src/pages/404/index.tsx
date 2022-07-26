import React from 'react';
import { Container, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const PageNotFound = () => {
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt: 4,
      }}>
      <SentimentVeryDissatisfiedIcon
        fontSize={'inherit'}
        sx={{ fontSize: 120, color: 'text.secondary' }}
      />
      <Typography variant='h3' color={'text.secondary'} sx={{ mt: 2 }}>
        404
      </Typography>
      <Typography variant='h5' color={'text.disabled'} sx={{ mt: 2 }}>
        Сторінку не знайдено
      </Typography>
    </Container>
  );
};

export default PageNotFound;
