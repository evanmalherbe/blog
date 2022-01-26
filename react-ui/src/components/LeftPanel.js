import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display rightpanel
function LeftPanel(props) {
  let displayUsers = [];
  let users = props.usersArray;
  let createPostActive = props.createPostActive;

  if (users !== undefined && users.length > 0) {
    let usersArray = users.split(",");

    displayUsers.push(
      <Button
        type="button"
        className="authorButtons"
        variant="secondary"
        onClick={() => props.updateSelectedUser(null)}
        key={0}
      >
        All Posts
      </Button>
    );

    for (let i = 0; i <= usersArray.length - 1; i++) {
      const name = usersArray[i];
      const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

      displayUsers.push(
        <Button
          type="button"
          className="authorButtons"
          variant="secondary"
          onClick={() => props.updateSelectedUser(usersArray[i])}
          key={i + 1}
        >
          {nameCapitalised}
        </Button>
      );
    }
  } else {
    displayUsers.push(
      <div className="redText" key={1}>
        No posts yet.
      </div>
    );
  }

  if (createPostActive === true) {
    displayUsers = (
      <div className="redText" key={1}>
        N/A
      </div>
    );
  }

  return (
    <div className="leftPanel">
      <h4>Authors</h4>
      {displayUsers}
    </div>
  );
}

// Export component to be used in other files
export default LeftPanel;
