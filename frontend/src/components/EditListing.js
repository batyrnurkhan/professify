import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Api';
import styles from '../css/EditListing.module.css';

const EditListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/listings/${slug}/`);
        setListing(response.data);
        setDescription(response.data.description);
        setPrice(response.data.price);
      } catch (error) {
        console.log('Error fetching listing:', error);
      }
    };

    fetchData();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedDescription = description.trim();
      const updatedPrice = parseFloat(price);

      console.log('Updating listing:', {
        description: updatedDescription,
        price: updatedPrice,
      });

      const response = await api.patch(`/listings/${slug}/`, {
        description: updatedDescription,
        price: updatedPrice,
      });

      if (response.status === 200) {
        navigate(`/listings/${slug}`);
      } else {
        console.log('Error updating listing:', response);
      }
    } catch (error) {
      console.log('Error updating listing:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Listing</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Title:
          <input
            type="text"
            value={listing ? listing.name: ''}
            disabled
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Listing</button>
      </form>
    </div>
  );
};

export default EditListing;
