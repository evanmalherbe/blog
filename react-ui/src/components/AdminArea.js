import React from "react";
import { AdminSortPosts } from "./AdminSortPosts";

import { Navigate } from "react-router-dom";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

// Import custom stylesheet
import "../App.css";

// Function to display Centre Panel
function AdminArea(props) {
  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let handleEditPost = props.handleEditPost;
  let handleDeletePost = props.handleDeletePost;

  let displayPosts = AdminSortPosts(
    titles,
    posts,
    ids,
    authors,
    handleDeletePost,
    handleEditPost
  );

  let showAdminArea;

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  if (props.authMessage === "Success! Token valid.") {
    showAdminArea = (
      <div className="adminArea">
        <h2>Admin Area</h2>
        <p>Edit or delete author's posts here.</p>
        {displayPosts}
      </div>
    );
  } else {
    showAdminArea = <Navigate to="/" />;
  }

  return (
    <div className="bodyDiv">
      <LeftPanel />
      {showAdminArea}
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default AdminArea;
