import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tmdb_getUserLibraries } from '../../api/tmdb';
import userAtom from '../../recoil/userStore';
import { Maybe, Movie } from '../../types';

type Movies = Maybe<Array<Movie>>;

const LibraryPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const locationState = location.state as { movies: Movies } | undefined;
  const [{ user }, setCurrentUserState] = useRecoilState(userAtom);

  const [movies, setMovies] = React.useState<Movies>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await tmdb_getUserLibraries({});
      } catch (error: any) {
        enqueueSnackbar(
          `Щось пішло не так. Спробуйте ще раз - ${error.message || error}`,
          {
            variant: 'error',
          }
        );
      }
    };

    loadMovies();
    // if (locationState?.movies) {
    //   setMovies(locationState.movies);
    // } else {
    // }
  }, [enqueueSnackbar]);

  return (
    <>
      <Box display={'flex'} flexDirection='column'>
        <Typography
          variant='h4'
          color='text.secondary'
          sx={{ verticalAlign: 'middle' }}>
          {user!.name}
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
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid container>
              {movies &&
                movies!.length &&
                movies!.map((item, index) => (
                  <Grid item key={index}>
                    <Box
                      sx={{
                        width: '140px',
                        height: '190px',
                        borderRadius: 0,
                      }}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                        width='100%'
                        height='100%'
                        alt={item.title}
                        title={item.title}
                      />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default LibraryPage;
