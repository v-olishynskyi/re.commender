import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SignIn, SignUp } from '../pages/Auth';
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
      <Route path='/' element={<HomePage />} />
      <Route
        path='/login'
        element={!currentUserState.user ? <SignIn /> : <HomePage />}
      />
      <Route
        path='/register'
        element={!currentUserState.user ? <SignUp /> : <HomePage />}
      />
      <Route path='/library' element={<LibraryPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/randomizer' element={<RandomizerPage />} />

      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
