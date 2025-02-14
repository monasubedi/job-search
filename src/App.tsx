import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { JobContextProvider } from "./context/JobContext";
import router from "./layouts/router";

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <JobContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastContainer />
      </JobContextProvider>
    </AuthContextProvider>
  );
}

export default App;
