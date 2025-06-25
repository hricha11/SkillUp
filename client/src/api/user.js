import axios from 'axios';
const API = import.meta.env.VITE_API_URL + '/users';

export const getUser = (id, token) =>
  axios.get(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateUser = (id, data, token) =>
  axios.put(`${API}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const searchAlumni = (params, token) =>
  axios.get(`${API}/search`, { params, headers: { Authorization: `Bearer ${token}` } }); 