import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary marginBot">
    <Link to="/" className="navbar-brand">
      NYT Search
    </Link>
    <Link to="/saved" className="navbar-brand">
      Saved Articles
    </Link>
  </nav>
);

export default Nav;
