import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import custom stylesheet
import "../App.css";

// Function to display rightpanel
function CreateWelcome(loggedIn, adminStatus, currentUser, handleLogout) {
  if (loggedIn) {
    console.log("CreateWelcome has run.");
    // Learned to capitalise first letter of a string here:
    // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/

    const name = currentUser;
    const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

    if (adminStatus === true) {
      return (
        <div className="loginStatusDiv">
          <p>Welcome, {nameCapitalised} (admin)!</p>
          <Button
            className="logoutButton"
            variant="primary"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    } else {
      return (
        <div className="loginStatusDiv">
          <p>Welcome, {nameCapitalised}!</p>
          <Button
            className="logoutButton"
            variant="primary"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    }
  } else {
    return (
      <div className="loginStatusDiv">
        <p>No active logins.</p>
      </div>
    );
  }
}

// Export component to be used in other files
export default CreateWelcome;
