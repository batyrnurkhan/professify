import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Login';
import Registration from './Registration';
import Logout from './Logout';
import Profile from './Profile';
import Listings from './Listings';
import ListingDetail from './ListingDetails';
import EditListing from './EditListing';
import Resumes from './Resumes';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:slug" element={<ListingDetail />} />
      <Route path="/listings/:slug/edit" element={<EditListing />} />
      <Route path="/resumes" element={<Resumes />} />
    </Routes>
  );
};

export default MainRoutes;
