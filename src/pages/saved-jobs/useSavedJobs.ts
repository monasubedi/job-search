import { useQuery } from "@tanstack/react-query";
import { getSavedJobs } from "../../services";

const useSavedJobs = () => {
  const getSavedJobsMutation = useQuery({
    queryKey: ["get-jobs"],
    queryFn: () => getSavedJobs(),
  });

  return {
    getSavedJobsMutation,
  };
};

export default useSavedJobs;
