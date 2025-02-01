import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Job } from "../../utils/types";

const URL: string = "https://jsearch.p.rapidapi.com";

const useJobDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [jobDetail, setJobDetail] = useState<Job | null>(null);
  const [searchParams] = useSearchParams();

  const getJobDetail = async () => {
    const id = searchParams.get("id") || "";
    const country = searchParams.get("country") || "";
    const params = {
      job_id: id,
      country,
    };
    const searchJobParams = new URLSearchParams(params).toString();
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${URL}/job-details?${searchJobParams}}`,
        {
          headers: {
            "x-rapidapi-key":
              "b913c48ea2mshcf3d287f0c6941dp12140ajsnefbbc5e519d0",
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
          },
        }
      );

      if (response) {
        setJobDetail(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobDetail();
  }, []);

  return {
    isLoading,
    error,
    jobDetail,
  };
};

export default useJobDetail;
