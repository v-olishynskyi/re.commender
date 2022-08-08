import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import CheckCircleIcon from '@mui/icons-material/Check';

import { tmdb_getPopularMovies } from '../../api/tmdb';
import {
  addDoc,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { firebaseDB } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { Movie, MovieCart } from '../../types';
import userAtom from '../../recoil/userStore';
import { getUserDoc, updateUserDoc } from '../../api/firebaseRequests';
import { getImageURI } from '../../utils/getImageURI';

const ChooseLikedMoviesPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [{ user }, setUserState] = useRecoilState(userAtom);

  const [loading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState<Array<Movie> | null>(null);
  const [selectedMovies, setSelectedMovies] = React.useState<Array<Movie>>([]);

  const isCanContinue = React.useMemo(
    () => selectedMovies.length >= 3,
    [selectedMovies]
  );

  const selectedMoviesIDs = React.useMemo(
    () => selectedMovies.map(item => item.id),
    [selectedMovies]
  );
  // const selectedMoviesGenreIDs = React.useMemo(() => {
  //   const genresSet = new Set(
  //     selectedMovies.map(item => item.genre_ids).flat(1)
  //   );

  //   return Array.from(genresSet);
  // }, [selectedMovies]);

  React.useEffect(() => {
    const request = async () => {
      try {
        setLoading(true);
        const data = await tmdb_getPopularMovies({});
        setMovies(data.results);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        enqueueSnackbar(`Щось пішло не так - ${error.message || error}`, {
          variant: 'error',
        });
      }
    };

    request();
  }, [enqueueSnackbar]);

  const handleClickMovie = (movie: Movie) => {
    const movieIndex = selectedMovies.findIndex(item => item.id === movie.id);

    if (movieIndex !== -1) {
      const newMovies = selectedMovies.filter(
        (_, index) => index !== movieIndex
      );
      return setSelectedMovies(newMovies);
    } else {
      const newMovies = [...selectedMovies];
      newMovies.push(movie);
      return setSelectedMovies(newMovies);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const movies: Array<MovieCart> = selectedMovies.map(movie => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        genre_ids: movie.genre_ids,
      }));

      const userDoc = (await getUserDoc(
        user!.uid
      )) as QueryDocumentSnapshot<DocumentData>;

      const data = {
        userUID: `users/${userDoc.id}`,
        movies,
      };

      await addDoc(collection(firebaseDB, 'usersLibraries'), data);
      await updateUserDoc(user!.uid, { isAlreadyChooseMovies: true });

      setUserState(prevState => ({
        ...prevState,
        user: {
          ...prevState.user!,
          library: selectedMovies,
          isAlreadyChooseMovies: true,
        },
      }));

      navigate('/library', {
        replace: true,
        state: { movies: selectedMovies },
      });

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(
        `Щось пішло не так. Спробуйте ще раз - ${error.message || error}`,
        {
          variant: 'error',
        }
      );
    }
  };

  return (
    <>
      {loading || !user ? (
        <CircularProgress />
      ) : (
        <>
          <Box display={'flex'} flexDirection='column'>
            <Typography
              variant='h4'
              color='text.secondary'
              sx={{ verticalAlign: 'middle' }}>
              {user?.name}
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
          <Button
            variant='contained'
            sx={{ mt: 3, mb: 3 }}
            disabled={!isCanContinue || loading}
            onClick={handleSubmit}>
            Продовжити
          </Button>
          <Box>
            <Grid container>
              {movies &&
                movies!.length &&
                movies!.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    component={IconButton}
                    onClick={() => {
                      handleClickMovie(item);
                    }}>
                    <Box
                      sx={{
                        width: '140px',
                        height: '190px',
                        borderRadius: 0,
                        opacity: selectedMoviesIDs.includes(item.id) ? 0.5 : 1,
                      }}>
                      <img
                        src={getImageURI(200, item.poster_path!)}
                        width='100%'
                        height='100%'
                        alt={item.title}
                        title={item.title}
                      />
                    </Box>
                    {selectedMoviesIDs.includes(item.id) && (
                      <Box
                        sx={{
                          position: 'absolute',
                        }}>
                        <CheckCircleIcon
                          sx={{
                            width: '100%',
                            height: '100%',
                            color: 'green',
                          }}
                        />
                      </Box>
                    )}
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default ChooseLikedMoviesPage;
