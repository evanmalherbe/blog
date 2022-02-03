import React from "react";

// Import custom stylesheet
import "../App.css";

import { Navigate } from "react-router-dom";
import FetchLogin from "./FetchLogin";

// Function to redirect user to FetchLogin component
function FetchHandleLogin() {
  console.log("Got to fetch handle login");

  return (
    <div>
      <FetchLogin />
    </div>
  );
}

// Export component to be used in other files
export default FetchHandleLogin;
