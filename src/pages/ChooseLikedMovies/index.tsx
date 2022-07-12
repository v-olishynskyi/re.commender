import React from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';

import { currentUserRecoilState } from '../../store';

const ChooseLikedMoviesPage = () => {
  const [currentUserState, setCurrentUserState] = useRecoilState(
    currentUserRecoilState
  );

  const [canContinue, setCanContinue] = React.useState(false);

  return (
    <>
      <Box display={'flex'} flexDirection='column'>
        <Typography
          variant='h4'
          color='text.secondary'
          sx={{ verticalAlign: 'middle' }}>
          {currentUserState.user?.name}
          <Typography component='span' variant='h5'>
            , виберіть 3 (або більше) фільмів які вам подобаються
          </Typography>
        </Typography>
        <Typography
          component='p'
          variant='body1'
          sx={{ mt: 1 }}
          color='text.secondary'>
          Це допоможе нам знайти фільми та ТВ-програми які можуть вам
          сподобатися.
        </Typography>
      </Box>
      <Button variant='contained' sx={{ mt: 3, mb: 3 }} disabled={!canContinue}>
        Продовжити
      </Button>
      <Box>
        <Grid container spacing={1}>
          {/* @ts-ignore */}
          {[
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ].map(() => (
            <Grid item>
              <IconButton
                sx={{
                  width: '140px',
                  height: '190px',
                  backgroundColor: 'yellow',
                  borderRadius: 0,
                }}>
                {/* <img /> */}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ChooseLikedMoviesPage;
