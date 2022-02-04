import React from "react";
import FacebookLogin from "react-facebook-login";

function FacebookRegButton(props) {
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

export default FacebookRegButton;
