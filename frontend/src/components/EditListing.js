import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Api';
import styles from '../css/EditListing.module.css';

const EditListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/listings/${slug}/`);
        setTitle(response.data.title);
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
      const updatedTitle = title.trim();
      const updatedDescription = description.trim();
      const updatedPrice = parseFloat(price);

      console.log('Updating listing:', {
        title: updatedTitle,
        description: updatedDescription,
        price: updatedPrice,
      });

      const response = await api.patch(`/listings/${slug}/`, {
        title: updatedTitle,
        description: updatedDescription,
        price: updatedPrice,
      });
      
      console.log('PATCH response:', response);
      

      if (response.status === 200) {
        navigate('/listings');
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
