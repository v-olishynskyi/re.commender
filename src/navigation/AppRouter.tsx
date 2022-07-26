import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SignIn, SignUp } from '../pages/Auth';
import ChooseLikedMoviesPage from '../pages/ChooseLikedMovies';
import PageNotFound from '../pages/404';
import HomePage from '../pages/Home';
import LibraryPage from '../pages/Library';
import ProfilePage from '../pages/Profile';
import RandomizerPage from '../pages/Randomizer';
import userAtom from '../recoil/userStore';

const AppRouter = () => {
  const { user } = useRecoilValue(userAtom);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route
        path='/login'
        element={!user ? <SignIn /> : <Navigate to={'/'} replace />}
      />
      <Route
        path='/register'
        element={!user ? <SignUp /> : <Navigate to={'/'} replace />}
      />
      <Route path='/library' element={<LibraryPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/randomizer' element={<RandomizerPage />} />
      <Route path='/chooseLikedMovies' element={<ChooseLikedMoviesPage />} />

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
