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

  let displayPosts = SortPosts(titles, posts, ids, authors);

  return (
    <div className="centerPanel">
      <h2>Blog Posts</h2>
      {displayPosts}
    </div>
  );
}

// Export component to be used in other files
export default CentrePanel;
