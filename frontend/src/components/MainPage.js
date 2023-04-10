import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../css/Main.module.css';

const MainPage = () => {
    return (
    <div>
        <div className={styles.container}>
        <h1>Welcome to Professify!</h1>
        <p className={styles.text}>
        Professify is an online platform that connects teachers and universities. Our mission is to bridge the gap between educational institutions and talented educators, providing a space where they can find each other and collaborate for a better learning experience.
        </p>
        <div className={styles.line}></div>
        <p className={styles.text}>
        In recent years, there has been a shortage of qualified staff in universities, leading to a decline in the quality of educational materials. Professify aims to tackle this issue by offering an efficient way for universities to discover and hire highly skilled teachers who are passionate about sharing their knowledge and contributing to the growth of the academic community.
        </p>
        </div>
    </div>
    );
};

export default MainPage;
