import React, { useState, useEffect } from 'react';
import api from '../Api';
import styles from '../css/Profile.module.css';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/listings/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
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
    first_name,
    last_name,
    email,
    phone_number,
    address,
    bio,
    skills,
    experience,
    profile_picture,
  } = profile;

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.pictureBlock}>
          <img
            src={profile_picture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className={styles.profilePicture}
          />
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.info}>
            <span className={styles.label}>First Name:</span>
            <span className={styles.value}>{first_name}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Last Name:</span>
            <span className={styles.value}>{last_name}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{email}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Phone Number:</span>
            <span className={styles.value}>{phone_number}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Address:</span>
            <span className={styles.value}>{address}</span>
          </div>
        </div>
      </div>
      <div className={styles.bioSection}>
        <div className={styles.info}>
          <span className={styles.label}>Bio:</span>
          <span className={styles.value}>{bio}</span>
        </div>
      </div>
      <div className={styles.skillsSection}>
        <div className={styles.info}>
          <span className={styles.label}>Skills:</span>
          <span className={styles.value}>{skills}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Experience:</span>
          <span className={styles.value}>{experience}</span>
        </div>
      </div>
      <div className={styles.listingsSection}>
        <h2>Listings:</h2>
        {listings.map((listing) => (
        <div key={listing.id}>
          <h3>
            <Link to={`/listings/${listing.slug}`}>{listing.name}</Link>
            </h3>
            </div>
  ))}
</div>
    </div>
  );
};

export default Profile;
