import React, { useEffect, useState } from 'react';
import api from '../Api';

const TestUserPage = () => {
  const [teacherProfiles, setTeacherProfiles] = useState([]);

  useEffect(() => {
    const fetchTeacherProfiles = async () => {
      try {
        const response = await api.get('/users/test-users/');
        console.log('Teacher Profiles:', response.data); // Debugging
        setTeacherProfiles(response.data);
      } catch (error) {
        console.error('Error fetching teacher profiles:', error);
      }
    };

    fetchTeacherProfiles();
  }, []);

  console.log('Teacher Profiles:', teacherProfiles); // Debugging

  return (
    <div>
      <h1>Test User Page</h1>
      <h2>Teacher Profiles:</h2>
      {teacherProfiles.map((profile) => (
        <div key={profile.id}>
          <p>First Name: {profile.first_name}</p>
          <p>Last Name: {profile.last_name}</p>
          <p>Email: {profile.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TestUserPage;
