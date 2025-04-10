import React, { useState } from 'react';
import jobService from '../services/jobService';

function JobItem({ job, onJobUpdated, onJobDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: job.status
  });

  const handleStatusChange = (e) => {
    setEditData({ ...editData, status: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updatedJob = await jobService.updateJob(job._id, {
        ...job,
        status: editData.status
      });
      onJobUpdated(updatedJob);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await jobService.deleteJob(job._id);
        onJobDeleted(job._id);
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'status-applied';
      case 'Interview': return 'status-interview';
      case 'Offer': return 'status-offer';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="job-item">
      <div className="job-header">
        <h3>{job.company}</h3>
        <div className="job-actions">
          <button onClick={() => setIsEditing(!isEditing)} className="btn btn-edit">
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button onClick={handleDelete} className="btn btn-delete">Delete</button>
        </div>
      </div>
      
      <div className="job-role">{job.role}</div>
      <div className="job-date">Applied on: {formatDate(job.appliedDate)}</div>
      
      {isEditing ? (
        <div className="job-edit">
          <label htmlFor={`status-${job._id}`}>Update Status:</label>
          <select
            id={`status-${job._id}`}
            value={editData.status}
            onChange={handleStatusChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={handleUpdate} className="btn btn-save">Save</button>
        </div>
      ) : (
        <div className={`job-status ${getStatusColor(job.status)}`}>
          Status: {job.status}
        </div>
      )}
      
      {job.link && (
        <div className="job-link">
          <a href={job.link} target="_blank" rel="noopener noreferrer">
            View Application
          </a>
        </div>
      )}
    </div>
  );
}

export default JobItem;