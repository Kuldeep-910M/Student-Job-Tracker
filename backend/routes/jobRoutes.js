const express = require('express');
const router = express.Router();
const { 
  getJobs, 
  addJob, 
  updateJob, 
  deleteJob 
} = require('../controllers/jobController');

router.route('/')
  .get(getJobs)
  .post(addJob);

router.route('/:id')
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;