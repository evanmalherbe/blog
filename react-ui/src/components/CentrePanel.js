import React from "react";
import { SortPosts } from "./SortPosts";

// Import custom stylesheet
import "../App.css";

// Function to display Centre Panel
function CentrePanel(props) {
  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let selectedUser = props.selectedUser;
  let dateCreated = props.dateCreatedArray;

  let displayPosts = SortPosts(
    titles,
    posts,
    ids,
    authors,
    selectedUser,
    dateCreated
  );

  let whosePosts;

  if (selectedUser === null) {
    whosePosts = "All posts";
  } else {
    const name = selectedUser;
    const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);
    whosePosts = `${nameCapitalised}'s posts`;
  }
  return (
    <div className="centerPanel" id="top">
      <h2>{whosePosts}</h2>
      {displayPosts}
      <a href="#top">Back to top</a>
    </div>
  );
}

// Export component to be used in other files
export default CentrePanel;
