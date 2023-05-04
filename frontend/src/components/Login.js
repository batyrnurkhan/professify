import React, { useState, useContext } from 'react';
import api from '../Api';
import Navbar from '../components/Navbar';
import styles from '../css/Login.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';
import { LoggedInContext } from '../components/LoggedInContext';

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
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={`${styles.textColor}`}>
            Email:
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          <label className={`${styles.textColor}`}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
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
