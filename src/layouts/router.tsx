import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Home from "../pages/home/home";
import JobDetail from "../pages/job-detail/job-detail";
import JobList from "../pages/job-list/job-list";
import SavedJobs from "../pages/saved-jobs/saved-jobs";
import Root from "./root";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/job-list/search",
        element: <JobList />,
      },
      {
        path: "/job-detail/search",
        element: <JobDetail />,
      },
      {
        path: "/saved-jobs",
        element: <SavedJobs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
