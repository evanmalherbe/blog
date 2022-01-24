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
  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let handleEditPost = props.handleEditPost;
  let handleDeletePost = props.handleDeletePost;

  let displayPosts = [];

  if (posts.length > 0) {
    let titlesArray = titles.split(",");
    let postsArray = posts.split("///,");

    let idsArray = ids.split(",");
    console.log("ids array is: " + idsArray);
    let authorsArray = authors.split(",");

    for (let i = 0; i <= postsArray.length - 1; i++) {
      console.log("for loop: " + i);
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
              onClick={handleEditPost}
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
    displayPosts.push(<div className="redText">No posts yet.</div>);
  }

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
