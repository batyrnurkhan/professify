import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';
import styles from '../css/EditProfile.module.css';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [existingProfilePicture, setExistingProfilePicture] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('bio', bio);
      formData.append('skills', skills);
      formData.append('phone_number', phoneNumber);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('experience', experience);
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      const response = await api.patch('users/profile/teacher/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigate('/teacher-profile');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <img src={existingProfilePicture} alt="Profile Picture" className={styles.profilePicture} />
        </label>
        <label className={styles.label}>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
        </label>
        <label className={styles.label}>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className={styles.textarea} />
        </label>
        <label className={styles.label}>
          Skills:
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Experience:
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className={styles.input}
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
