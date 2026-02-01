
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://mercadourbano-backend.onrender.com',
  withCredentials: false
});

export default api;
