import React from "react";

// Import facebook login
import FacebookLogin from "react-facebook-login";

// Function to display facebook register button
function FacebookRegButton(props) {
  // Send fb name and userId to app.js to be used to create login for new user
  const responseFacebook = (response) => {
    props.handleFacebookRegister(response.name, response.userID);
  };
  return (
    <div>
      <FacebookLogin
        appId="640271867025410"
        fields="name,email,picture"
        callback={responseFacebook}
        textButton="&nbsp;&nbsp;Register with Facebook"
      />
    </div>
  );
}

// Export component to be used by other files
export default FacebookRegButton;
