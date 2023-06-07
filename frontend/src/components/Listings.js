import React, { useState, useEffect } from 'react';
import api from '../Api';
import styles from '../css/Listings.module.css';
import { Link } from 'react-router-dom';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Listings</h1>
      <div className={styles.listings}>
        {listings.map((listing) => {
          return (
            <div key={listing.id} className={styles.listing}>
              <img src={listing.picture} alt={listing.name} className={styles.picture} />
              <div className={styles.details}>
                <Link to={`/listings/${listing.slug}`}>
                  <h2 className={styles.name}>{listing.name}</h2>
                </Link>
                <p className={styles.description}>{listing.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
