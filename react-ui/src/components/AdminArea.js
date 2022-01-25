import React from "react";
// import { AdminSortPosts } from "./AdminSortPosts";
import { Navigate } from "react-router-dom";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

// Import custom stylesheet
import "../App.css";

// Function to display Centre Panel
function AdminArea(props) {
  // Make variable names shorter

  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let callEditPost = props.callEditPost;
  let handleDeletePost = props.handleDeletePost;

  let displayPosts = [];

  // If there are posts, display them, else display "No posts" message
  if (posts.length > 0) {
    // Create arrays from db data by splitting at commas
    let titlesArray = titles.split(",");
    let idsArray = ids.split(",");
    let authorsArray = authors.split(",");

    // Posts are delimited by /// - as I was having issues with commas in the actual post content
    let postsArray = posts.split("///,");

    // Loop through posts and create divs for each post with buttons to delete and edit
    for (let i = 0; i <= postsArray.length - 1; i++) {
      displayPosts.push(
        <div className="post" key={idsArray[i]}>
          <div className="author">
            Author: {authorsArray[i]}, Id: {idsArray[i]}
          </div>
          <div className="title">{titlesArray[i]}</div>

          {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
          <div className="postBody">{postsArray[i].replace("///", "")}</div>
          <div className="postButtons">
            <Button
              className="buttons"
              variant="primary"
              type="button"
              onClick={() =>
                callEditPost(
                  idsArray[i],
                  titlesArray[i],
                  postsArray[i],
                  authorsArray[i]
                )
              }
            >
              Edit Post
            </Button>
            <Button
              className="buttons"
              variant="primary"
              type="button"
              onClick={() => handleDeletePost(idsArray[i])}
            >
              Delete Post
            </Button>
          </div>
        </div>
      );
    }
  } else {
    // Display message if no posts are saved yet
    displayPosts.push(<div className="redText">No posts yet.</div>);
  }

  // Create variable to display admin area or not depending on whether user is logged in
  let showAdminArea;

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  // if user logged in, show admin area
  if (props.authMessage === "Success! Token valid." && props.adminStatus) {
    showAdminArea = (
      <div className="adminArea">
        <h2>Admin Area</h2>
        <p>Edit or delete author's posts here.</p>
        {displayPosts}
      </div>
    );
  } else {
    // Else redirect to home page
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
