import React, { useState, useEffect } from 'react';
import api from '../Api';
import styles from '../css/Profile.module.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/profile/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (
          response.data.user.is_teacher ||
          response.data.user.is_staff ||
          response.data.user.is_univer
        ) {
          setProfile(response.data);
          if (response.data.listings) {
            setListings(response.data.listings);
          }
        } else {
          setProfile(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return (
      <div className={styles.errorMessage}>
        <h1>You don't have permission to view this page.</h1>
      </div>
    );
  }

  const {
    user,
    bio,
    birth_date,
    phone_number,
    profile_picture,
    address,
    city,
    country,
    gender,
    age,
    experience,
    skills,
  } = profile;

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img
          src={profile_picture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className={styles.profilePicture}
        />
        <div className={styles.nameInfo}>
          <span className={styles.label}>First Name:</span>
          <span className={styles.value}>{profile.first_name}</span>
        </div>
        <div className={styles.nameInfo}>
          <span className={styles.label}>Last Name:</span>
          <span className={styles.value}>{profile.last_name}</span>
        </div>
        <div className={styles.nameInfo}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{user.email}</span>
        </div>
        <div className={styles.nameInfo}>
          <span className={styles.label}>Phone Number:</span>
          <span className={styles.value}>{phone_number}</span>
        </div>
        <div className={styles.nameInfo}>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>{address}</span>
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.info}>
          <span className={styles.label}>Bio:</span>
          <span className={styles.value}>{bio}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Skills:</span>
          <span className={styles.value}>{skills}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Experience:</span>
          <span className={styles.value}>{experience}</span>
        </div>
      </div>
      <div className={styles.thirdSection}>
        {/* Third block content */}
      </div>
    </div>
  );
};

export default Profile;
