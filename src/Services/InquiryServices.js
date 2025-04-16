import axios from 'axios';

const API_URL = 'https://localhost:44374/api/Inquries';

export const getInquiries = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getInquiryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createInquiry = async (inquiry) => {
  const response = await axios.post(API_URL, inquiry);
  return response.data;
};

export const updateInquiry = async (id, inquiry) => {
  const response = await axios.put(`${API_URL}/${id}`, inquiry);
  return response.data;
};

export const deleteInquiry = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
