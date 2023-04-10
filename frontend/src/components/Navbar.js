import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Navbar.module.css';
import logo from '../pictures/logo2-removebg-preview.png';
import { LoggedInContext } from './LoggedInContext';

const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
       <Link to="/" className={styles.logoWrapper}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.buttons}>
        {!loggedIn ? (
          <>
            <Link
              to="/register"
              className={`${styles.button} ${styles.registerButton}`}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={`${styles.button} ${styles.loginButton}`}
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className={`${styles.button} ${styles.profileButton}`}
            >
              Profile
            </Link>

            <Link
            to="/logout"
            className={`${styles.button} ${styles.logoutButton}`}
            >
              Logout
              </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
