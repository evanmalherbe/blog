import React from "react";

// Import Link component to be used as part of React Router to display particular components based on URL
import { Link } from "react-router-dom";

// Import images
import lock from "../lockGrey.png";
import home from "../homeGrey.png";
import key from "../keyGrey.png";

/* Create function to display dropdown menu to choose page. Changing the page (or URL) will then let us use 
React router to only show particular components to the user (i.e. Minesweeper game or Help page) */
function Menu(props) {
  let loginLink;
  let createPostLink;
  let adminAreaLink;
  let registerLink;

  // Only display these links in menu if there is no user logged in yet
  if (!props.loggedIn) {
    loginLink = (
      <li>
        <Link to="/Login" className="menuLink">
          <img src={lock} className="menuIcon" alt="" />
          Log in
        </Link>
      </li>
    );

    registerLink = (
      <li>
        <Link to="/Register" className="menuLink">
          <img src={key} className="menuIcon" alt="" /> Register
        </Link>
      </li>
    );
  }

  // Only display these links in menu if a user is logged in
  if (props.loggedIn) {
    createPostLink = (
      <li>
        <Link to="/CreatePost" className="menuLink">
          Create Post
        </Link>
      </li>
    );
  }

  if (props.loggedIn && props.adminStatus) {
    adminAreaLink = (
      <li>
        <Link to="/AdminArea" className="menuLink">
          Admin Area
        </Link>
      </li>
    );
  }

  return (
    <div className="menuDiv">
      <ul>
        <li>
          <Link to="/" className="menuLink">
            <img src={home} className="menuIcon" alt="" />
            Home
          </Link>
        </li>
        {loginLink}
        {registerLink}
        {createPostLink}
        {adminAreaLink}
      </ul>
    </div>
  );
}

// Export component so it can be used by Header component
export default Menu;
