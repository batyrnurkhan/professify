import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';
import styles from '../css/CreateListing.module.css';

const CreateListing = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modulesCount, setModulesCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new listing object
    const newListing = {
      name,
      description,
      modules_count: modulesCount,
      price,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/listings/', newListing, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log('Create Listing Response:', response.data);

      // Redirect to the created listing detail page
      navigate(`/listings/${response.data.slug}`);
    } catch (error) {
      console.error('Error creating listing:', error.response);
      setError('Error creating listing');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="modulesCount">Modules Count</label>
          <input
            type="number"
            id="modulesCount"
            value={modulesCount}
            onChange={(e) => setModulesCount(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className={styles.error}>{error}</div>
        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Create Listing
          </button>
          <button type="button" className={styles.cancelButton} onClick={() => navigate('/listings')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
