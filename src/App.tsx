import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { JobContextProvider } from "./context/JobContext";
import router from "./layouts/router";

function App() {
  const queryClient = new QueryClient();
  return (
    <JobContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </JobContextProvider>
  );
}

export default App;
