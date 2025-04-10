import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/jobs';

// Get all jobs
const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add new job
const addJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData);
  return response.data;
};

// Update job
const updateJob = async (id, jobData) => {
  const response = await axios.put(`${API_URL}/${id}`, jobData);
  return response.data;
};

// Delete job
const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const jobService = {
  getJobs,
  addJob,
  updateJob,
  deleteJob
};

export default jobService;