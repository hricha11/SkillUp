import axios from 'axios';
const API = import.meta.env.VITE_API_URL + '/compare-skills';

export const compareSkills = (data, token) =>
  axios.post(API, data, { headers: { Authorization: `Bearer ${token}` } }); 