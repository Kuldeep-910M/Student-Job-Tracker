function sortJobsByDate(jobs) {
    // Make a copy to avoid modifying the original array
    const sortedJobs = [...jobs];
    
    // Sort by applied date (latest first)
    sortedJobs.sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return dateB - dateA;
    });
    
    return sortedJobs;
  }
  
  // Example usage
  const jobs = [
    {
      company: "Google",
      role: "SDE Intern",
      appliedDate: "2025-04-01"
    },
    {
      company: "Amazon",
      role: "Frontend Developer",
      appliedDate: "2025-03-15"
    },
    {
      company: "Microsoft",
      role: "Software Engineer",
      appliedDate: "2025-04-10"
    }
  ];
  
  const sortedJobs = sortJobsByDate(jobs);
  console.log(sortedJobs);