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

        // Fetch the user profile using the appropriate endpoint
        const response = await api.get('/users/profile/teacher', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        // Set the localProfile based on the user data
        setLocalProfile(response.data);

        // Set the global profile using the setProfile function
        setProfile(response.data);

        // Determine the user roles based on the is_teacher and is_university fields
        const userRoles = {
          isTeacher: response.data.is_teacher,
          isUniversity: response.data.is_university,
        };


        // Store userRoles as a JSON string
        localStorage.setItem('userRoles', JSON.stringify(userRoles));

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
  const userRoles = JSON.parse(localStorage.getItem('userRoles')) || {};
  const hasAdminPermission = localProfile?.user?.is_staff !== undefined
  ? localProfile.user.is_staff
  : userRoles.isStaff;



  console.log('1', userRoles);
  console.log('3', hasAdminPermission);


  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.buttonGroup}>
        {token && (
          <>
            <Link to="/listings" className={`${styles.button} ${styles.listingsButton}`}>
              Listings
            </Link>
              <div className={styles.dropdown}>
                <button className={`${styles.button} ${styles.universityButton}`}>
                  Universities
                </button>
                <div className={styles.dropdownContent}>
                  <Link to="/university-resumes" className={styles.dropdownLink}>
                    Resumes
                  </Link>
                  <Link to="/university-profile" className={styles.dropdownLink}>
                    Profile
                  </Link>
                </div>
              </div>
            

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
