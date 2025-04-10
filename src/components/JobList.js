import React, { useState, useEffect } from 'react';
import JobItem from './JobItem';
import FilterComponent from './FilterComponent';
import jobService from '../services/jobService';



function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    dateSort: 'newest'
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...jobs];
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(job => job.status === filters.status);
    }
    
    // Apply date sort
    result.sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      
      return filters.dateSort === 'newest' 
        ? dateB - dateA 
        : dateA - dateB;
    });
    
    setFilteredJobs(result);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs(jobs.map(job => 
      job._id === updatedJob._id ? updatedJob : job
    ));
  };

  const handleJobDeleted = (jobId) => {
    setJobs(jobs.filter(job => job._id !== jobId));
  };

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  return (
    <div className="job-list-container">
      <h2>Your Job Applications</h2>
      
      <FilterComponent onFilterChange={handleFilterChange} />
      
      {filteredJobs.length === 0 ? (
        <div className="no-jobs">
          No job applications found. Start by adding your first application!
        </div>
      ) : (
        <div className="job-list">
          {filteredJobs.map(job => (
            <JobItem 
              key={job._id} 
              job={job}
              onJobUpdated={handleJobUpdated}
              onJobDeleted={handleJobDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;