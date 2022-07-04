import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import LibraryPage from '../pages/Library';
import ProfilePage from '../pages/Profile';

// const ROUTES =

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/library' element={<LibraryPage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRouter;
