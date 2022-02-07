import React from "react";

// Import facebook login
import FacebookLogin from "react-facebook-login";

// Function to display facebook login button
// Learned how to use this here:
// https://medium.com/recraftrelic/login-with-facebook-and-google-in-reactjs-990d818d5dab

function FacebookLoginButton(props) {
  // Send fb name and userId to function in app.js to use as login details
  const responseFacebook = (response) => {
    props.handleFacebookLogin(response.name, response.userID);
  };
  return (
    <div>
      <FacebookLogin
        appId="640271867025410"
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}

// Export component to be used by other files
export default FacebookLoginButton;
