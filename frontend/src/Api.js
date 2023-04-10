import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with the actual URL of your DRF backend
});

export default api;
