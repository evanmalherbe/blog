import React from "react";

// Import logo image
import logo from "../blogLogo.png";

// Import custom stylesheet
import "../App.css";

// Function to display header
function Header(props) {
  return (
    <header className="header">
      <div className="logoAndHeading">
        <img src={logo} className="logo" alt="logo" />
        <h1>Blog</h1>
      </div>
      <div className="headerLinks">
        <a href="">Home</a>
      </div>
    </header>
  );
}

// Export component to be used in other files
export default Header;
