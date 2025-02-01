import { Close, Menu } from "@mui/icons-material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { nav_items } from "../../utils/constants";
import { navItem } from "../../utils/types";
import "./navbar.css";

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);

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
          <ul>
            {nav_items.map((item: navItem) => (
              <Link to={item.to} key={item.title}>
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
          <div className="buttons">
            <Link to={"/login"}>Sign In</Link>
            <Link to={"/register"}>Sign Up</Link>
          </div>
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
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
          <div className="buttons">
            <Link to={"/login"}>Sign In</Link>
            <Link to={"/register"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
