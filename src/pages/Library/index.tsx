import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUserLibraryDoc } from '../../api/firebaseRequests';
import userAtom from '../../recoil/userStore';
import { Maybe, MovieCart } from '../../types';
import { getImageURI } from '../../utils/getImageURI';
import './index.css';

type MovieCardProps = {
  movie: MovieCart;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const [showMovieDetail, setShowMovieDetail] = React.useState<boolean>(false);

  return (
    <Box
      sx={{ width: '140px', height: '190px', borderRadius: 0 }}
      onMouseEnter={() => {
        setShowMovieDetail(true);
      }}
      onMouseLeave={() => {
        setShowMovieDetail(false);
      }}>
      {!showMovieDetail ? (
        <Box>
          <img
            src={getImageURI(200, movie.poster_path!)}
            width={140}
            height={190}
            alt={movie.title}
            title={movie.title}
          />
        </Box>
      ) : (
        <Box className='movie-card-full'>
          <Box>
            <img
              src={getImageURI(200, movie.poster_path!)}
              width={140}
              height={190}
              alt={movie.title}
              title={movie.title}
            />
            <Box
              sx={{
                position: 'absolute',
                backgroundColor: 'gray',
                width: '140px',
                height: '190px',
                top: 8,
                opacity: 0.8,
              }}>
              <span style={{ color: '#fff' }}>
                <b>{movie.title}</b>
              </span>
              <br />
              <span style={{ color: '#fff' }}>{movie.genre_ids[0]}</span>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const LibraryPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as
    | { movies: Array<MovieCart> }
    | undefined;
  const [{ user }] = useRecoilState(userAtom);

  const [movies, setMovies] = React.useState<Maybe<Array<MovieCart>>>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const response = (await getUserLibraryDoc(user!.uid, true)) as {
          movies: Array<MovieCart>;
          userUID: string;
        };

        setMovies(response?.movies || null);
        setLoading(false);
      } catch (error: any) {
        console.log(' loadMovies ~ error', error);
        setLoading(false);

        enqueueSnackbar(
          `Щось пішло не так. Спробуйте ще раз - ${error.message || error}`,
          {
            variant: 'error',
          }
        );
      }
    };

    if (user) {
      if (locationState?.movies) {
        setMovies(locationState.movies);
      } else {
        loadMovies();
      }
    }
  }, [enqueueSnackbar, user, locationState]);

  const onClickUpdateLibrary = () => {
    navigate('/chooseLikedMovies');
  };

  return (
    <>
      {!user || loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            <Grid container spacing={1}>
              {movies && movies!.length ? (
                movies!.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{ position: 'relative', borderRadius: 10 }}>
                    <MovieCard movie={item} />
                  </Grid>
                ))
              ) : (
                <Box sx={{ flexDirection: 'column' }}>
                  <Typography>Бібліотека порожня</Typography>
                  <Button
                    sx={{ mt: 2 }}
                    variant='contained'
                    onClick={onClickUpdateLibrary}>
                    Оновити бібліотеку
                  </Button>
                </Box>
              )}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default LibraryPage;
