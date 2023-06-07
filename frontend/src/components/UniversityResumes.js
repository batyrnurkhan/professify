import React, { useEffect, useState } from 'react';
import api from '../Api';
import styles from '../css/Resumes.module.css';

const UniversityResumes = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/resumes/', {});
      console.log('Fetched users:', response.data);  // Debug line
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles['loading-message']}>Loading...</div>;
  }

  const teacherUsers = users.filter(user => user.is_teacher);

  console.log('Teacher users:', teacherUsers); // Debug line
  
  console.log('First user:', JSON.stringify(teacherUsers[0], null, 2));


  return (
    <div className={styles['main-container']}>
      <h1 className={styles.title}>Resumes</h1>
      {teacherUsers.map((user, index) => (
        <div key={index} className={styles['resume-container']}>
          <div className={styles['resume-id']}>{`User Number: ${index + 1}`}</div>
          <div className={styles['resume-details']}>
            <h3 className={styles['resume-header']}>Bio</h3>
            <p className={`${styles['resume-text']} ${styles['truncate-text']}`}>{user.bio}</p>
            <h3 className={styles['resume-header']}>Experience</h3>
            <p className={styles['resume-text']}>{user.experience}</p>
            <h3 className={styles['resume-header']}>Skills</h3>
            <p className={styles['resume-text']}>{user.skills}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UniversityResumes;
