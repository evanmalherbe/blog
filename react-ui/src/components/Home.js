import React from "react";

// Import custom stylesheet
import "../App.css";

// Import components
import RightPanel from "./RightPanel";
import CentrePanel from "./CentrePanel";
import LeftPanel from "./LeftPanel";

// Function to display rightpanel
function Home(props) {
  return (
    <div className="bodyDiv">
      <LeftPanel />
      <CentrePanel
        titlesArray={props.titlesArray}
        idArray={props.idArray}
        postsArray={props.postsArray}
        authorArray={props.authorArray}
        message={props.message}
      />
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default Home;
