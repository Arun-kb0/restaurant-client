import axios from 'axios';

const HOST = import.meta.env.VITE_HOST || 'localhost';
const PORT = import.meta.env.VITE_PORT || 3001;

const BASE_URL = HOST ? HOST : `http://${HOST}:${PORT}`

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});
