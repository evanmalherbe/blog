import React from "react";

// Import custom stylesheet
import "../App.css";

// Function to display rightpanel
function LeftPanel(props) {
  let displayUsers = [];
  let users = props.usersArray;

  if (users !== undefined && users.length > 0) {
    let usersArray = users.split(",");

    displayUsers.push(
      <button
        type="button"
        className="users"
        onClick={() => props.updateSelectedUser(null)}
        key={0}
      >
        All Posts
      </button>
    );

    for (let i = 0; i <= usersArray.length - 1; i++) {
      const name = usersArray[i];
      const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

      displayUsers.push(
        <button
          type="button"
          className="users"
          onClick={() => props.updateSelectedUser(usersArray[i])}
          key={i + 1}
        >
          {nameCapitalised}
        </button>
      );
    }
  } else {
    displayUsers.push(
      <div className="redText" key={1}>
        No posts yet.
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
