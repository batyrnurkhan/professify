import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/Navbar.module.css';
import logo from '../pictures/logo3.png';
import api from '../Api';
import { LoggedInContext } from './LoggedInContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { setLoggedInUser, setProfile } = useContext(LoggedInContext);
  const [localProfile, setLocalProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setLocalProfile(response.data);
        setProfile(response.data);
        setLoggedInUser(response.data.user);
        //console.log('loggedInUser in Navbar:', response.data.user);
        //console.log("loggedInUser in Navbar after setting profile:", response.data.user);

        console.log("Fetched user ID:", response.data.user.id);

      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    

    fetchProfile();
  }, [setProfile, setLoggedInUser]);

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRoles');
    navigate('/');
  };

  const token = localStorage.getItem('token');
  const userRoles = localStorage.getItem('userRoles') || '';

  const hasProfilePermission = !!localProfile?.user && (
    localProfile.user.is_teacher ||
    localProfile.user.is_staff ||
    localProfile.user.is_univer
  );

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.buttonGroup}>
        {token ? (
          <>
            {hasProfilePermission && (
              <Link
                to="/profile"
                className={`${styles.button} ${styles.profileButton}`}
              >
                Profile
              </Link>
            )}
            <Link
              to="/listings"
              className={`${styles.button} ${styles.listingsButton}`}
            >
              Listings
            </Link>
            <button
              onClick={handleLogout}
              className={`${styles.logoutButton} ${styles.logoutButton}`}
            >
              Logout
            </button> 
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`${styles.button} ${styles.loginButton}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`${styles.button} ${styles.registerButton}`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
