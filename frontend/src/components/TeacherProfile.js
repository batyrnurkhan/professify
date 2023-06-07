import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api';
import styles from '../css/TeacherProfile.module.css';

const TeacherProfile = () => {
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/profile/teacher/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log('API Response:', response.data);

        setTeacherProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
        setLoading(false);
      }
    };

    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/listings/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log('Listings Response:', response.data);

        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchTeacherProfile();
    fetchListings();
  }, []);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teacherProfile) {
    return (
      <div className={styles.errorMessage}>
        <h1>You don't have permission to view this page.</h1>
      </div>
    );
  }

  const {
    first_name,
    last_name,
    phone_number,
    address,
    bio,
    skills,
    experience,
    city,
    profile_picture,
  } = teacherProfile;

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.leftBlock}>
          <img src={profile_picture} alt="Profile Picture" className={styles.profilePicture} />
          <button className={styles.editButton} onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
        <div className={styles.rightBlock}>
          <div className={styles.nameBlock}>
            <h2>{`${first_name} ${last_name}`}</h2>
          </div>
          <div className={styles.contactBlock}>
            <div className={styles.contactInfo}>
              <span className={styles.label}>Phone:</span>
              <span>{phone_number}</span>
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.label}>Address:</span>
              <span>{address}</span>
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.label}>City:</span>
              <span>{city}</span>
            </div>
          </div>
          <div className={styles.bioBlock}>
            <span className={styles.label}>Bio:</span>
            <span>{bio}</span>
          </div>
          <div className={styles.skillsBlock}>
            <span className={styles.label}>Skills:</span>
            <span>{skills}</span>
          </div>
          <div className={styles.experienceBlock}>
            <span className={styles.label}>Experience:</span>
            <span>{experience} years</span>
          </div>
        </div>
      </div>

      {listings && listings.length > 0 && (
        <div className={styles.listingsBlock}>
          <h2>Listings:</h2>
          {listings.map((listing) => (
            <div key={listing.id} className={styles.listingItem}>
              <h3>
                <Link to={`/listings/${listing.slug}`}>{listing.name}</Link>
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
