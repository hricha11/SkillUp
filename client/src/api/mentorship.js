import axios from 'axios';
const API = import.meta.env.VITE_API_URL + '/mentorship';

export const requestMentorship = (data, token) =>
  axios.post(API, data, { headers: { Authorization: `Bearer ${token}` } }); 