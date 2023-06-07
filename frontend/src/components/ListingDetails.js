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

  const handleBuy = () => {
    const filename = `${listing.slug}.txt`;
    const content = `This is the content of the listing with slug: ${listing.slug}`;

    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
    element.download = filename;
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.info}>
          <h1 className={styles.name}>{listing.name}</h1>
          <p className={styles.description}>{listing.description}</p>
          <p className={styles.modulesCount}>
            <strong>Modules Count:</strong> {listing.modules_count}
          </p>
          <p className={styles.price}>
            <strong>Price:</strong> {listing.price}
          </p>
          <p className={styles.author}>
            <strong>Author:</strong> {listing.author_email}
          </p>
        </div>
        <div className={styles.picture}>
          <img src={listing.picture} alt="Listing" />
          {loggedInUser && loggedInUser.username === listing.author_email && (
          <button className={styles.editButton} onClick={() => navigate(`/listings/${listing.slug}/edit`)}>
            Edit
            </button>
            )}


        </div>
        <button className={styles.buyButton} onClick={handleBuy}>
      Buy
    </button>
      </div>
    </div>
  );
};

export default ListingDetails;
