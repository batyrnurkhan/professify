import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInContext } from './LoggedInContext';

const Logout = () => {
  const { setLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }, [setLoggedIn, navigate]);

  return null;
};

export default Logout;
