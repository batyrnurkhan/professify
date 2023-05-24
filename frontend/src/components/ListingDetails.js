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


  console.log()
  return (
    <div className={styles.container}>
      {listing ? (
        <>
          <h1 className={styles.heading}>{listing.name}</h1>
          <p>{listing.description}</p>
          {loggedInUser && loggedInUser.id === listing.author && (
  <button onClick={() => navigate(`/listings/${listing.slug}/edit`)}>Edit</button>
)}

        </>
      ) : (
        <p>Listing not found</p>
      )}
    </div>
  );
};

export default ListingDetails;
