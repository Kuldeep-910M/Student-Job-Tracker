import React, { useState } from 'react';
import jobService from '../services/jobService';



function AddJobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    link: ''
  });

  const { company, role, status, appliedDate, link } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newJob = await jobService.addJob(formData);
      onJobAdded(newJob);
      
      // Reset form
      setFormData({
        company: '',
        role: '',
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        link: ''
      });
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Application</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={onChange}
            required
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="appliedDate">Date Applied</label>
          <input
            type="date"
            id="appliedDate"
            name="appliedDate"
            value={appliedDate}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="link">Application Link</label>
          <input
            type="url"
            id="link"
            name="link"
            value={link}
            onChange={onChange}
            placeholder="https://"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Application</button>
      </form>
    </div>
  );
}

export default AddJobForm;