import axios from "axios";
import React, { useState } from "react";
import { Job } from "../utils/types";

const URL: string = "https://jsearch.p.rapidapi.com";

const useSearchJobs = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobList, setJobList] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const searchJobs = async (params: Record<string, string>) => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams(params).toString();
      const response = await axios.get(`${URL}/search?${searchParams}`, {
        headers: {
          "x-rapidapi-key":
            "b913c48ea2mshcf3d287f0c6941dp12140ajsnefbbc5e519d0",
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      });

      if (response) {
        setJobList(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setQuery("");
      setLocation("");
      setIsLoading(false);
    }
  };

  return {
    query,
    location,
    jobList,
    isLoading,
    error,
    setJobList,
    handleQueryChange,
    handleLocationChange,
    searchJobs,
  };
};

export default useSearchJobs;
