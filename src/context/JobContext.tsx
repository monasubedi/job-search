import { createContext, useContext, useState } from "react";

interface JobContextType {
  jobIds: string[];
  setJobIds: (id: string[]) => void;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [jobIds, setJobIds] = useState<string[]>([]);
  return (
    <JobContext.Provider value={{ jobIds, setJobIds }}>
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
