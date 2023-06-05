import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Login';
import Registration from './Registration';
import Logout from './Logout';
import UniversityProfile from './UniversityProfile.js';
import TeacherProfile from './TeacherProfile';
import UniversityResumes from './UniversityResumes';
import EditProfile from './EditProfile';
import Listings from './Listings';
import ListingDetail from './ListingDetails';
import EditListing from './EditListing';
import PassExamPage from './PassExamPage';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/university-profile" element={<UniversityProfile />} />
      <Route path="/teacher-profile" element={<TeacherProfile />} />

      <Route path="/edit-profile" element={<EditProfile />} /> 

      <Route path="/university-resumes" element={<UniversityResumes />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:slug" element={<ListingDetail />} />
      <Route path="/listings/:slug/edit" element={<EditListing />} />
      <Route path="/pass-exam" element={<PassExamPage />} />
    </Routes>
  );
};

export default MainRoutes;
