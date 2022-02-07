import React from "react";

import { Navigate } from "react-router-dom";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

import { SortModifyPosts } from "./SortModifyPosts";

// Import custom stylesheet
import "../App.css";

// Function to display Centre Panel
function ModifyPosts(props) {
  // Make variable names shorter
  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let dateCreated = props.dateCreatedArray;
  let dateModified = props.dateModifiedArray;
  let handleDeletePost = props.handleDeletePost;
  let currentUser = props.currentUser;
  let displayPosts = [];
  let toggleEditVar = props.toggleEditVar;
  let showEditPost = props.showEditPost;

  // Create variable to display admin area or not depending on whether user is logged in
  let showModifyArea;

  if (showEditPost === true) {
    showModifyArea = <Navigate to="/EditPost" />;
  } else {
    // If there are posts, display them, else display "No posts" message
    if (posts.length > 0) {
      // Create arrays from db data by splitting at commas
      let titlesArray = titles.split(",");
      let idsArray = ids.split(",");
      let authorsArray = authors.split(",");
      let dateCreatedArray = dateCreated.split(",");
      let dateModifiedArray = dateModified.split(",");

      // Posts are delimited by /// - as I was having issues with commas in the actual post content
      let postsArray = posts.split("///,");

      // Call external function to determine how the page displays
      displayPosts = SortModifyPosts(
        postsArray,
        currentUser,
        idsArray,
        authorsArray,
        titlesArray,
        toggleEditVar,
        handleDeletePost,
        dateCreatedArray,
        dateModifiedArray
      );
    } else {
      // Display message if no posts are saved yet
      displayPosts.push(<div className="redText">No posts yet.</div>);
    }

    // Learned to redirect/Navigate with react router here:
    // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

    // if user logged in, show admin area
    if (props.authMessage === "Success! Token valid.") {
      showModifyArea = (
        <div className="adminArea" id="top">
          <h2>Modify Posts</h2>
          <p>Edit or delete your posts here.</p>
          {displayPosts}
          <br />
          <a href="#top">Back to top</a>
          <br />
        </div>
      );
    } else {
      // Else redirect to home page
      showModifyArea = <Navigate to="/" />;
    }

    // End of first if statement to show page or redirect to edit post page
  }

  return (
    <div className="bodyDiv">
      <LeftPanel
        usersArray={props.usersArray}
        updateSelectedUser={props.updateSelectedUser}
      />
      {showModifyArea}

      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default ModifyPosts;
