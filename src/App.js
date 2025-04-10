import React, { useState } from 'react';
import Header from './components/Header';
import AddJobForm from './components/AddJobForm';
import JobList from './components/JobList';
import './styles.css';

function App() {
  const [jobListKey, setJobListKey] = useState(0);

  const handleJobAdded = () => {
    // Force JobList component to re-render
    setJobListKey(prevKey => prevKey + 1);
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <AddJobForm onJobAdded={handleJobAdded} />
        <JobList key={jobListKey} />
      </main>
      <footer className="footer">
        <p>Student Job Tracker &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;