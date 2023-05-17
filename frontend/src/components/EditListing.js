import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoggedInContext } from './LoggedInContext';
import styles from '../css/EditListing.module.css';

const EditListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(LoggedInContext);
  const token = localStorage.getItem('token');

  const [listing, setListing] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${slug}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const { name, description, price } = response.data;
        setName(name || '');
        setDescription(description || '');
        setPrice(price || '');
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };
    fetchListing();
  }, [slug, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    try {
      await axios.patch(`/api/listings/${slug}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });

      navigate('/listings');
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Edit Listing</h1>
      {listing && (
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>Description:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.label}>Price:</label>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles['submit-button']}>
            Update Listing
          </button>
        </form>
      )}
    </div>
  );
};

export default EditListing;