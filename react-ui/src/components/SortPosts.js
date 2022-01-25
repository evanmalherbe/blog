import React from "react";

export function SortPosts(titles, posts, ids, authors, selectedUser) {
  let i;
  let displayPosts = [];

  if (posts !== undefined && posts.length > 0) {
    let titlesArray = titles.split(",");
    let postsArray = posts.split("///,");
    let authorsArray = authors.split(",");
    let idsArray = ids.split(",");

    for (i = 0; i <= postsArray.length - 1; i++) {
      if (selectedUser === null) {
        displayPosts.push(
          <div className="post" key={idsArray[i]}>
            <div className="author">Author: {authorsArray[i]}</div>
            <div className="title">{titlesArray[i]}</div>

            {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
            <div className="postBody">{postsArray[i].replace("///", "")}</div>
          </div>
        );
      } else if (authorsArray[i] === selectedUser) {
        displayPosts.push(
          <div className="post" key={idsArray[i]}>
            <div className="author">Author: {authorsArray[i]}</div>
            <div className="title">{titlesArray[i]}</div>

            {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
            <div className="postBody">{postsArray[i].replace("///", "")}</div>
          </div>
        );
      }
    }

    if (displayPosts.length === 0) {
      displayPosts.push(
        <div className="redText" key={1}>
          No posts yet.
        </div>
      );
    }
  } else {
    displayPosts.push(
      <div className="redText" key={1}>
        No posts yet.
      </div>
    );
  }

  return displayPosts;
}
