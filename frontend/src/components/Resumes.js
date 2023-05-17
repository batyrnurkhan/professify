import React, { useEffect, useState } from 'react';
import api from '../Api';

const Resumes = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await api.get('/users/resumes/', {
        params: {
          is_teacher: true,
        },
      });
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
    <div>
      <h1>Resumes</h1>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h2>{`${profile.id}`}</h2>
          <p>Bio: {profile.bio}</p>
          <p>Experience: {profile.experience}</p>
          <p>Skills: {profile.skills}</p>
        </div>
      ))}
    </div>
  );
};

export default Resumes;
