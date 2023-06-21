import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-secondary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <i className="fa-solid fa-charging-station"></i>
          <span className="ml-2">ZapQuest</span>
        </Link>
        <Link to="/login" className="btn btn-dark">
            Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
