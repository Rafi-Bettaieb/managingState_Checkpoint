import React from "react";
import { Link } from "react-router-dom";
import "../App.css"

function Header() {
  //adding a logo and a navbar
  return (
    <header className="header">
      <img
        src="https://i.pinimg.com/564x/db/f2/01/dbf201ea8fa5ec57209fc19aa5c2574a.jpg"
        alt="not found"
      />
      <nav className="links">
        <Link to="/" className="nav-link">
          All Tasks
        </Link>
        <Link to="/completed" className="nav-link">
          Completed Tasks
        </Link>
      </nav>
    </header>
  );
}

export default Header;
