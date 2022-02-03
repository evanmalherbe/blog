import React from "react";
// import { AdminSortPosts } from "./AdminSortPosts";
import { Navigate } from "react-router-dom";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

import { SortAdminPage } from "./SortAdminPage";

// Import custom stylesheet
import "../App.css";

// Function to display Centre Panel
function AdminArea(props) {
  // Make variable names shorter
  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let dateCreated = props.dateCreatedArray;
  let handleDeletePost = props.handleDeletePost;
  let selectedUser = props.selectedUser;
  let displayPosts = [];
  let toggleEditVar = props.toggleEditVar;
  let showEditPost = props.showEditPost;
  let adminStatus = props.adminStatus;
  // Create variable to display admin area or not depending on whether user is logged in
  let showAdminArea;

  if (showEditPost === true && adminStatus === true) {
    showAdminArea = <Navigate to="/EditPost" />;
  } else {
    // If there are posts, display them, else display "No posts" message
    if (posts.length > 0) {
      // Create arrays from db data by splitting at commas
      let titlesArray = titles.split(",");
      let idsArray = ids.split(",");
      let authorsArray = authors.split(",");
      let dateCreatedArray = dateCreated.split(",");

      // Posts are delimited by /// - as I was having issues with commas in the actual post content
      let postsArray = posts.split("///,");

      // Call external function to determine how the page displays
      displayPosts = SortAdminPage(
        postsArray,
        selectedUser,
        idsArray,
        authorsArray,
        titlesArray,
        toggleEditVar,
        handleDeletePost,
        dateCreatedArray
      );
    } else {
      // Display message if no posts are saved yet
      displayPosts.push(<div className="redText">No posts yet.</div>);
    }

    // Learned to redirect/Navigate with react router here:
    // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

    // if user logged in, show admin area
    if (
      props.authMessage === "Success! Token valid." &&
      props.adminStatus === true
    ) {
      showAdminArea = (
        <div className="adminArea" id="top">
          <h2>Admin Area</h2>
          <p>Edit or delete author's posts here.</p>
          {displayPosts}
          <br />
          <a href="#top">Back to top</a>
          <br />
        </div>
      );
    } else {
      // Else redirect to home page
      showAdminArea = <Navigate to="/" />;
    }

    // End of first if statement to show page or redirect to edit post page
  }

  return (
    <div className="bodyDiv">
      <LeftPanel
        usersArray={props.usersArray}
        updateSelectedUser={props.updateSelectedUser}
      />
      {showAdminArea}

      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default AdminArea;
