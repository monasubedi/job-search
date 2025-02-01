import React, { useState } from "react";

const useJobList = () => {
  const [jobType, setJobType] = useState("FULLTIME");
  const [category, setCategory] = useState("");
  const [jobLevel, setJobLevel] = useState("under_3_years_experience");

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);

    setJobType(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleJobLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobLevel(e.target.value);
  };



  return {
    jobType,
    category,
    jobLevel,
    handleJobTypeChange,
    handleCategoryChange,
    handleJobLevelChange,
  };
};

export default useJobList;
