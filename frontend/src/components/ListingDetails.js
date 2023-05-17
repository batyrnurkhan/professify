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

  const handleListingUpdate = async () => {
    navigate(`/listings/${slug}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  const { name, description } = listing;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{name}</h1>
      <p>{description}</p>
      {loggedInUser && loggedInUser.id === listing.author && (
        <button onClick={handleListingUpdate}>Edit</button>
      )}
    </div>
  );
};

export default ListingDetails;
