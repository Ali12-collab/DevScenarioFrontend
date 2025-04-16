import axios from 'axios';

const API_URL = 'https://localhost:44374/api/StatusLevel';

export const getStatusLevels = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getStatusLevelById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createStatusLevel = async (statusLevel) => {
  const response = await axios.post(API_URL, statusLevel);
  return response.data;
};

export const updateStatusLevel = async (id, statusLevel) => {
  const response = await axios.put(`${API_URL}/${id}`, statusLevel);
  return response.data;
};

export const deleteStatusLevel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};