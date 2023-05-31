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
          response.data.user.is_university
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
        <div className={styles.leftBlock}>
          <div className={styles.pictureBlock}>
            <img
              src={profile_picture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className={styles.profilePicture}
            />
          </div>
          <div className={styles.nameBlock}>
            <div className={styles.firstName}>{first_name}</div>
            <div className={styles.lastName}>{last_name}</div>
          </div>
          <div className={styles.skillsBlock}>
            <div className={styles.skills}>{skills}</div>
          </div>
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.bioBlock}>
            <h2>Bio</h2>
            <p>{bio}</p>
          </div>
          <div className={styles.experienceBlock}>
            <h2>Experience</h2>
            <p>{experience}</p>
          </div>
        </div>
      </div>
      <div className={styles.listingsBlock}>
        <h2>Listings</h2>
        {listings.map((listing) => (
          <div key={listing.id} className={styles.listingItem}>
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
