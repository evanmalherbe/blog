import React from "react";

// Import custom stylesheet
import "../App.css";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

// Function to display rightpanel
function Home(props) {
  return (
    <div className="bodyDiv">
      <LeftPanel />
      <div className="centerPanel">
        <h2>Bob's blog</h2>{" "}
        <p>
          {"« "}
          <strong>{props.message}</strong>
          {" »"}
        </p>
      </div>
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default Home;
