import React from "react";
import FacebookLogin from "react-facebook-login";

function FacebookLoginButton(props) {
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

export default FacebookLoginButton;
