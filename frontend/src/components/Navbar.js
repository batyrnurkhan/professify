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
  const [hasTeacherPermission, setHasTeacherPermission] = useState(false);
  const [hasUniversityPermission, setHasUniversityPermission] = useState(false);

  const fetchTeacherProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/profile/teacher', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setLocalProfile(response.data);
      setProfile(response.data);
      setHasTeacherPermission(response.data.is_teacher);
    } catch (error) {
      console.error('Error fetching teacher profile:', error);
    }
  };

  const fetchUniversityProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/profile/university', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setLocalProfile(response.data);
      setProfile(response.data);
      setHasUniversityPermission(response.data.is_university);
    } catch (error) {
      console.error('Error fetching university profile:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (localProfile && localProfile.is_teacher) {
        setHasTeacherPermission(true);
      } else if (localProfile && localProfile.is_university) {
        setHasUniversityPermission(true);
      } else {
        fetchTeacherProfile();
        fetchUniversityProfile();
      }
    }
  }, [localProfile]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const token = localStorage.getItem('token');
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.buttonGroup}>
        {token && (
          <>
            {hasTeacherPermission && (
              <div className={styles.dropdown}>
                <button className={`${styles.button} ${styles.teacherButton}`}>
                  Teachers
                </button>
                <div className={styles.dropdownContent}>
                  <Link to="/teacher-profile" className={styles.dropdownLink}>
                    Profile
                  </Link>
                </div>
              </div>
            )}
            {hasUniversityPermission && (
              <div className={styles.dropdown}>
                <button className={`${styles.button} ${styles.universityButton}`}>
                  Universities
                </button>
                <div className={styles.dropdownContent}>
                  <Link to="/university-profile" className={styles.dropdownLink}>
                    Profile
                  </Link>
                  <Link to="/university-resumes" className={styles.dropdownLink}>
                    Resumes
                    </Link>
                </div>
              </div>
            )}
            <div className={styles.dropdown}>
              <button className={`${styles.button} ${styles.universityButton}`}>
                Listings
                </button>
                <div className={styles.dropdownContent}>
                  <Link to="/listings" className={styles.dropdownLink}>
                    Saved Listings
                    </Link>
                    <Link to="/listings/create" className={styles.dropdownLink}>
                      Create Listing
                      </Link>
                      </div>
                      </div>
            <Link
              to="/"
              onClick={handleLogout}
              className={`${styles.button} ${styles.logoutButton}`}
            >
              Logout
            </Link>
          </>
        )}
        {!token && (
          <>
            <Link to="/login" className={`${styles.button} ${styles.loginButton}`}>
              Login
            </Link>
            <Link to="/register" className={`${styles.button} ${styles.registerButton}`}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
