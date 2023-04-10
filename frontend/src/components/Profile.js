import React, { useState, useEffect } from 'react';
import api from '../Api';
import styles from '../css/Profile.module.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

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

  console.log(profile)
  if (!profile) {
    return <div>Error fetching profile.</div>;
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
      <h1 className={styles.heading}>Profile</h1>
      <div className={styles.info}>
        <div className={styles.label}>First Name:</div>
        <div className={styles.value}>{profile.first_name}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Last Name:</div>
        <div className={styles.value}>{profile.last_name}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Email:</div>
        <div className={styles.value}>{profile.email}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Bio:</div>
        <div className={styles.value}>{profile.bio}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Birth Date:</div>
        <div className={styles.value}>{profile.birth_date}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Phone Number:</div>
        <div className={styles.value}>{profile.phone_number}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Address:</div>
        <div className={styles.value}>{profile.address}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>City:</div>
        <div className={styles.value}>{profile.city}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Country:</div>
        <div className={styles.value}>{profile.country}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Gender:</div>
        <div className={styles.value}>{profile.gender}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Age:</div>
        <div className={styles.value}>{profile.age}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Experience:</div>
        <div className={styles.value}>{profile.experience}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.label}>Skills:</div>
        <div className={styles.value}>{profile.skills}</div>
      </div>
    </div>
  );
};

export default Profile;
