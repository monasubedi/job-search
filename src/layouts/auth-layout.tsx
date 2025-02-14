import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { useAuthContext } from "../context/AuthContext";

const AuthLayout = () => {
  const auth = useAuthContext();

  if (auth && !auth.isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px 30px" }}>
        <Outlet />
        {/* <footer>this is footer</footer> */}
      </main>
    </div>
  );
};

export default AuthLayout;
