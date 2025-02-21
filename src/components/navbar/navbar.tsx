import { Close, Menu } from "@mui/icons-material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { nav_items } from "../../utils/constants";
import { navItem } from "../../utils/types";
import "./navbar.css";

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const authContext = useAuthContext();

  const handleShowMenuItems = () => {
    if (menuRef.current) {
      menuRef.current.style.right = "0px";
    }
  };
  const handleClose = () => {
    if (menuRef.current) {
      menuRef.current.style.right = "-360px";
    }
  };
  return (
    <nav className="navbar">
      <div className="navbarWrapper">
        <Link to={"/"}>
          <div className="logo">Logo</div>
        </Link>

        <div className="navItems">
          <ul data-testid="desktop-navItems">
            {nav_items.map((item: navItem) => (
              <Link to={item.to} key={item.title}>
                {item.protected &&
                  authContext.isAuthenticated &&
                  item.roles.includes(authContext.userData.roles[0]) && (
                    <li data-testid="desktop-navItems">{item.title}</li>
                  )}
              </Link>
            ))}
          </ul>
          {authContext.isAuthenticated ? (
            <div
              data-testid="desktop-logout"
              style={{ cursor: "pointer" }}
              onClick={() => authContext.logout()}
            >
              Logout
            </div>
          ) : (
            <div className="buttons">
              <Link data-testid="desktop-signin" to={"/login"}>
                Sign In
              </Link>
              <Link data-testid="desktop-signup" to={"/register"}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className="menuIcon" onClick={handleShowMenuItems}>
          <Menu fontSize="large" />
        </div>
        <div className="navItems-mobile" ref={menuRef}>
          <div
            onClick={handleClose}
            style={{ textAlign: "right", width: "100%", cursor: "pointer" }}
          >
            <Close fontSize="large" />
          </div>
          <ul>
            {nav_items.map((item: navItem) => (
              <Link to={item.to} key={item.title}>
                <li data-testid="mobile-navItems">{item.title}</li>
              </Link>
            ))}
          </ul>
          {authContext.isAuthenticated ? (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => authContext.logout()}
            >
              Logout
            </div>
          ) : (
            <div className="buttons">
              <Link data-testid="mobile-signin" to={"/login"}>
                Sign In
              </Link>
              <Link data-testid="mobile-signup" to={"/register"}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
