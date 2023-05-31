import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Api';
import styles from '../css/ListingDetails.module.css';
import { LoggedInContext } from './LoggedInContext';
import { useNavigate } from 'react-router-dom';

const ListingDetails = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const { loggedInUser } = useContext(LoggedInContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/listings/${slug}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setListing(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listing:', error.response);
        setError('Error fetching listing');
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{listing.name}</h1>
      <div className={styles.details}>
        <div className={styles.description}>
          <h3>Description:</h3>
          <p>{listing.description}</p>
        </div>
        <div className={styles.info}>
          <h3>Details:</h3>
          <p>
            <strong>Modules Count:</strong> {listing.modules_count}
          </p>
          <p>
            <strong>Price:</strong> {listing.price}
          </p>
          <p>
            <strong>Author:</strong> {listing.author}
          </p>
        </div>
      </div>
      {loggedInUser && loggedInUser.id === listing.author && (
        <button className={styles.editButton} onClick={() => navigate(`/listings/${listing.slug}/edit`)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default ListingDetails;
