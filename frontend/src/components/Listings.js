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
              <Link to={`/listings/${listing.slug}`}>
                <h2>{listing.name}</h2>
              </Link>
              <p>{listing.description}</p>
              <p>Price: {listing.price}</p> {/* Add this line to display the price */}
              {parseInt(localStorage.getItem('user_id')) === listing.author && (
                <button>Edit</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
