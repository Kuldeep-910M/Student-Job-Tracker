import React from 'react';

function FilterComponent({ onFilterChange }) {
  const handleStatusChange = (e) => {
    onFilterChange('status', e.target.value);
  };

  const handleDateSortChange = (e) => {
    onFilterChange('dateSort', e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          onChange={handleStatusChange}
          defaultValue=""
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="dateSort">Sort by Date:</label>
        <select
          id="dateSort"
          onChange={handleDateSortChange}
          defaultValue="newest"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

export default FilterComponent;