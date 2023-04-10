import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Login';
import Registration from './Registration';
import Logout from './Logout';
import Profile from './Profile';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default MainRoutes;
