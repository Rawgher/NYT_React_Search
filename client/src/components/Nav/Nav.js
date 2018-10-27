import React from "react";
import "./Nav.css"

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary marginBot">
    <a className="navbar-brand" href="/">
      NYT Search
    </a>
    <a className="navbar-brand" href="/saved">
      Saved Articles
    </a>
  </nav>
);

export default Nav;
