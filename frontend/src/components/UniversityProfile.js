import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';
import styles from '../css/UniversityProfile.module.css';

const UniversityProfile = () => {
  const [universityProfile, setUniversityProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/profile/university/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log('API Response:', response.data);

        setUniversityProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching university profile:', error);
        setLoading(false);
      }
    };

    fetchUniversityProfile();
  }, []);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!universityProfile) {
    return (
      <div className={styles.errorMessage}>
        <h1>You don't have permission to view this page.</h1>
      </div>
    );
  }

  const {
    full_university_name,
    abbreviation,
    city,
    address,
    phone_number,
    profile_picture
  } = universityProfile;

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.leftBlock}>
          <img src={profile_picture} alt="Profile Picture" className={styles.profilePicture} />
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.nameBlock}>
            <h2>{full_university_name}</h2>
            <p>{abbreviation}</p>
          </div>
          <div className={styles.contactBlock}>
            <div className={styles.contactInfo}>
              <span className={styles.label}>City:</span>
              <span>{city}</span>
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.label}>Address:</span>
              <span>{address}</span>
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.label}>Phone:</span>
              <span>{phone_number}</span>
            </div>
          </div>
        </div>
      </div>
      <button className={styles.editButton} onClick={handleEditProfile}>
        Edit Profile
      </button>
    </div>
  );
};

export default UniversityProfile;
