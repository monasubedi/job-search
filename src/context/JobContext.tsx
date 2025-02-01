import { createContext, useContext, useState } from "react";
import { Job } from "../utils/types";

interface JobListQuery {
  isLoading: boolean;
  error: boolean;
  data: Job[];
}

interface JobContextType {
  jobListQuery: JobListQuery;
  setJobListQuery: (jobListQuery: JobListQuery) => void;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [jobListQuery, setJobListQuery] = useState<JobListQuery>({
    isLoading: false,
    error: false,
    data: [],
  });
  return (
    <JobContext.Provider value={{ jobListQuery, setJobListQuery }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const jobContext = useContext(JobContext);

  if (!jobContext) {
    throw new Error("It must be wrapped by the Context Provider.");
  }
  return jobContext;
};
