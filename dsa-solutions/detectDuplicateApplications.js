function detectDuplicateApplications(jobs) {
    const seen = new Map();
    const duplicates = [];
    
    jobs.forEach((job, index) => {
      // Create a unique key combining company and role (case insensitive)
      const key = `${job.company.toLowerCase()}-${job.role.toLowerCase()}`;
      
      if (seen.has(key)) {
        // This is a duplicate - add both original and current job to duplicates
        const originalIndex = seen.get(key);
        
        // Only add the pair if we haven't already recorded this duplicate
        const alreadyRecorded = duplicates.some(dup => 
          (dup.original === originalIndex && dup.duplicate === index) ||
          (dup.original === index && dup.duplicate === originalIndex)
        );
        
        if (!alreadyRecorded) {
          duplicates.push({
            original: originalIndex,
            duplicate: index,
            company: job.company,
            role: job.role
          });
        }
      } else {
        // First time seeing this combination
        seen.set(key, index);
      }
    });
    
    return duplicates;
  }
  
  // Example usage
  const jobs = [
    { company: "Google", role: "SDE Intern" },
    { company: "Amazon", role: "Frontend Developer" },
    { company: "google", role: "sde intern" },  // Duplicate (case insensitive)
    { company: "Microsoft", role: "Software Engineer" },
    { company: "Amazon", role: "Frontend Developer" }  // Duplicate (exact match)
  ];
  
  const duplicates = detectDuplicateApplications(jobs);
  console.log(duplicates);