import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
