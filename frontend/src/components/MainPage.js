import React from 'react';
import styles from '../css/Main.module.css';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Higher Education Ecosystem</h1>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque convallis enim id dictum. In consequat felis quis tristique placerat. Suspendisse nec metus sed est aliquet pharetra vel sed felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras et lacus orci. 
      </p>
      <div className={styles.line}></div>
      <p className={styles.text}>
        Nunc euismod tellus ut tristique auctor. Duis dapibus purus mauris, at tristique velit tempor eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras in enim luctus, ultrices lectus eu, gravida mi. Fusce id efficitur arcu. Suspendisse eget semper orci. 
      </p>
    </div>
  );
};

export default MainPage;
