import React from "react";

export function SortPosts(titles, posts, ids, authors) {
  let i;
  let displayPosts = [];

  if (posts.length > 0) {
    let titlesArray = titles.split(",");
    let postsArray = posts.split("///,");

    let idsArray = ids.split(",");
    let authorsArray = authors.split(",");

    for (i = 0; i <= postsArray.length - 1; i++) {
      displayPosts.push(
        <div className="post" key={idsArray[i]}>
          <div className="author">
            Author: {authorsArray[i]}, Id: {idsArray[i]}
          </div>
          <div className="title">{titlesArray[i]}</div>

          {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
          <div className="postBody">{postsArray[i].replace("///", "")}</div>
        </div>
      );
    }
  } else {
    displayPosts.push(<div className="redText">No posts yet.</div>);
  }

  return displayPosts;
}
