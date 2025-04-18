import axios from 'axios';

const HOST = import.meta.env.HOST || 'localhost'
const PORT = import.meta.env.PORT || 3001

export const axiosInstance = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
});
