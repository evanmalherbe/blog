import React from "react";

import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../Utils/refreshToken";

// Learned how to create Google login button here:
// https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del

function GoogleRegButton(props) {
  const clientId =
    "814875559791-253acrmfifcppvudqmbq3790gi63k7sv.apps.googleusercontent.com";

  const onSuccess = (res) => {
    refreshTokenSetup(res);
    props.handleGoogleRegister(res.profileObj.name, res.profileObj.googleId);
  };

  const onFailure = (res) => {
    console.log("Registration failed: res:", res);
    //alert(`Failed to register.`);
  };

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

export default GoogleRegButton;
