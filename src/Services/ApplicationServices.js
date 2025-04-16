import axios from 'axios';

const API_URL = 'https://localhost:44374/api/Application'; // Replace with your actual API URL

export const getApplications = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const getApplicationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
};

export const createApplication = async (application) => {
  try {
    const response = await axios.post(API_URL, application);
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

export const updateApplication = async (id, application) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, application);
    return response.data;
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};

