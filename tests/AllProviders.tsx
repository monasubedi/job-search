import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { AuthContextProvider } from "../src/context/AuthContext";
import { JobContextProvider } from "../src/context/JobContext";

const AllProviders = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <AuthContextProvider>
      <JobContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </JobContextProvider>
    </AuthContextProvider>
  );
};

export default AllProviders;
