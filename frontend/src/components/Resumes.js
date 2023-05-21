import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api';
import styles from '../css/Resumes.module.css';

const Resumes = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await api.get('/users/resumes/');
      setProfiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.resumesContainer}>
      <h1 className={styles.heading}>Resumes</h1>
      {profiles.map((profile) => (
        <div key={profile.id} className={styles.profileContainer}>
          <Link to={`/api/users/resumes/${profile.id}`}>
  <h2>{`${profile.id}`}</h2>
</Link>

          <p className={styles.bio}>Bio: {profile.bio}</p>
          <p className={styles.experience}>Experience: {profile.experience}</p>
          <p className={styles.skills}>Skills: {profile.skills}</p>
        </div>
      ))}
    </div>
  );
};

export default Resumes;
