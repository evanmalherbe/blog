import React from "react";

// Import Link component to be used as part of React Router to display particular components based on URL
import { Link } from "react-router-dom";

/* Create function to display dropdown menu to choose page. Changing the page (or URL) will then let us use 
React router to only show particular components to the user (i.e. Minesweeper game or Help page) */
function Menu(props) {
  let loginLink;
  let createPostLink;

  // Only display log in link in menu if there is no user logged in yet
  if (!props.loggedIn) {
    loginLink = (
      <li>
        <Link to="/Login" className="menuLink">
          Log in
        </Link>
      </li>
    );
  }

  // Only display create post link in menu if a user is logged in
  if (props.loggedIn) {
    createPostLink = (
      <li>
        <Link to="/CreatePost" className="menuLink">
          Create Post
        </Link>
      </li>
    );
  }

  return (
    <div className="menuDiv">
      <ul>
        <li>
          <Link to="/" className="menuLink">
            Home
          </Link>
        </li>
        {loginLink}
        <li>
          <Link to="/Register" className="menuLink">
            Register
          </Link>
        </li>
        {createPostLink}
      </ul>
    </div>
  );
}

// Export component so it can be used by Header component
export default Menu;
