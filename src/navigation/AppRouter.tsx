import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SignIn, SignUp } from '../pages/Auth';
import ChooseLikedMoviesPage from '../pages/ChooseLikedMovies';
import Error from '../pages/Error';
import HomePage from '../pages/Home';
import LibraryPage from '../pages/Library';
import ProfilePage from '../pages/Profile';
import RandomizerPage from '../pages/Randomizer';
import { currentUserRecoilState } from '../store';

const AppRouter = () => {
  const currentUserState = useRecoilValue(currentUserRecoilState);

  return (
    <Routes>
      <Route path='/' element={<ChooseLikedMoviesPage />} />
      {/* <Route path='/' element={<HomePage />} /> */}
      <Route
        path='/login'
        element={
          !currentUserState.user ? <SignIn /> : <Navigate to={'/'} replace />
        }
      />
      <Route
        path='/register'
        element={
          !currentUserState.user ? <SignUp /> : <Navigate to={'/'} replace />
        }
      />
      <Route path='/library' element={<LibraryPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/randomizer' element={<RandomizerPage />} />

      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
