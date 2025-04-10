function countStatusFrequency(jobs) {
    const statusCount = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };
    
    // Count occurrences of each status
    jobs.forEach(job => {
      if (statusCount[job.status] !== undefined) {
        statusCount[job.status]++;
      }
    });
    
    return statusCount;
  }
  
  // Example usage
  const jobs = [
    { company: "Google", status: "Applied" },
    { company: "Amazon", status: "Interview" },
    { company: "Facebook", status: "Rejected" },
    { company: "Microsoft", status: "Applied" },
    { company: "Apple", status: "Applied" },
    { company: "Netflix", status: "Offer" },
    { company: "Twitter", status: "Interview" },
    { company: "Airbnb", status: "Rejected" },
    { company: "Tesla", status: "Applied" },
    { company: "Uber", status: "Rejected" }
  ];
  
  const statusFrequency = countStatusFrequency(jobs);
  console.log(statusFrequency);