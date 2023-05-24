import React, { useState, useContext } from 'react';
import api from '../Api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { LoggedInContext } from '../components/LoggedInContext';
import styles from '../css/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(LoggedInContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login form');
    try {
      const response = await api.post('/users/login/', {
        username: username,
        password: password,
      });

      console.log('Login response:', response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        console.log('Token stored:', response.data.token);
        setError('');
        navigate('/');
        navigate(0);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blueSection}>
        <h1>Welcome to Professify!</h1>
        <p>Discover a world of opportunities in education.</p>
      </div>
      <div className={styles.whiteSection}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          <label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
              placeholder="Email"
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Password"
            />
          </label>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
