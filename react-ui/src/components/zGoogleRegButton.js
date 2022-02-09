import React from "react";

import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../Utils/refreshToken";

// Learned how to create Google login button here:
// https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del

function GoogleRegButton(props) {
  // Google client id
  const clientId =
    "814875559791-253acrmfifcppvudqmbq3790gi63k7sv.apps.googleusercontent.com";

  // function to run on successful login
  const onSuccess = (res) => {
    refreshTokenSetup(res);

    // Send google user name and id to function in app.js to be used to create new user login
    props.handleGoogleRegister(res.profileObj.name, res.profileObj.googleId);
  };

  // Console log message if login fails
  const onFailure = (res) => {
    console.log("Registration failed: res:", res);
  };

  // Display google "register" button
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Register with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
      />
    </div>
  );
}

// Export component to be used by other files
export default GoogleRegButton;
