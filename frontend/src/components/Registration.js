import React, { useState } from 'react';
import api from '../Api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Register.module.css';

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register/', {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 201) {
        setError('');
        navigate('/login');
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
        <div className={styles.greenSection}>
          <h1>Welcome to Professify!</h1>
          <p>
            Join our platform and unlock new opportunities in the education
            sector.
          </p>
        </div>
        <div className={styles.whiteSection}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={styles.input}
                placeholder="First Name"
              />
            </label>
            <label className={styles.label}>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={styles.input}
                placeholder="Last Name"
              />
            </label>
            <label className={styles.label}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
                placeholder="Email"
              />
            </label>
            <label className={styles.label}>
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
              Register
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Registration;
