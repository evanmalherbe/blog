import React from "react";

export function SortPosts(
  titles,
  posts,
  ids,
  authors,
  selectedUser,
  dateCreated,
  dateModified
) {
  let i;
  let displayPosts = [];

  if (posts !== undefined && posts.length > 0) {
    let titlesArray = titles.split(",");
    let postsArray = posts.split("///,");
    let authorsArray = authors.split(",");
    let idsArray = ids.split(",");
    let dateCreatedArray = dateCreated.split(",");
    let dateModifiedArray = dateModified.split(",");

    for (i = 0; i <= postsArray.length - 1; i++) {
      // Capitalise author names
      const name = authorsArray[i];
      const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

      if (selectedUser === null) {
        displayPosts.push(
          <div className="post" key={idsArray[i]}>
            <div className="author">
              <b>Author:</b> {nameCapitalised}
            </div>
            <div className="title">{titlesArray[i]}</div>

            {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
            <div className="postBody">{postsArray[i].replace("///", "")}</div>
            <div className="bothTimeStamps">
              <div className="dateCreated">
                {" "}
                <b>Date Created:</b> &nbsp;{dateCreatedArray[i]}
              </div>
              <div className="dateModified">
                <b>Date Modified:</b>&nbsp;
                {dateModifiedArray[i]}
              </div>
            </div>
          </div>
        );
      } else if (authorsArray[i] === selectedUser) {
        displayPosts.push(
          <div className="post" key={idsArray[i]}>
            <div className="author">
              <b>Author:</b> {nameCapitalised}
            </div>
            <div className="title">{titlesArray[i]}</div>

            {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
            <div className="postBody">{postsArray[i].replace("///", "")}</div>
            <div className="bothTimeStamps">
              <div className="dateCreated">
                {" "}
                <b>Date Created:</b>&nbsp; {dateCreatedArray[i]}
              </div>
              <div className="dateModified">
                <b>Date Modified:</b> &nbsp;{dateModifiedArray[i]}
              </div>
            </div>
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
