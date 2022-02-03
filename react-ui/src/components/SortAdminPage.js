import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

export function SortAdminPage(
  postsArray,
  selectedUser,
  idsArray,
  authorsArray,
  titlesArray,
  toggleEditVar,
  handleDeletePost,
  dateCreatedArray
) {
  let displayPosts = [];

  // Loop through posts and create divs for each post with buttons to delete and edit
  for (let i = 0; i <= postsArray.length - 1; i++) {
    if (selectedUser === null) {
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
                toggleEditVar(
                  idsArray[i],
                  authorsArray[i],
                  titlesArray[i],
                  postsArray[i]
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
          <div className="date"> Date Created: {dateCreatedArray[i]}</div>
        </div>
      );
    } else if (authorsArray[i] === selectedUser) {
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
                toggleEditVar(
                  idsArray[i],
                  authorsArray[i],
                  titlesArray[i],
                  postsArray[i]
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
          <div className="date"> Date Created: {dateCreatedArray[i]}</div>
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

  return displayPosts;
}
