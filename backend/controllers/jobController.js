const Job = require('../models/jobModel');

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ appliedDate: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new job
const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update job status
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    await job.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  addJob,
  updateJob,
  deleteJob
};