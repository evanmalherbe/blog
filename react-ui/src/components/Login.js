import React from "react";

import { Navigate } from "react-router-dom";

import GoogleLogin from "react-google-login";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl, FormGroup, Row, Col } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display rightpanel
function Login(props) {
  let showLoginPage;

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  if (props.authMessage === "Success! Token valid.") {
    showLoginPage = <Navigate to="/CreatePost" />;
  } else {
    showLoginPage = (
      <div className="loginDiv">
        <h1>Log in</h1>
        {/* Learned how to turn autocomplete off here: 
      https://reactgo.com/react-turn-off-autocomplete/ */}
        <Form id="loginForm" autoComplete="off" className="loginForm">
          <FormGroup className="mb-3">
            {" "}
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Enter username"
              onChange={props.handleUsername}
            />{" "}
          </FormGroup>
          <FormGroup className="mb-3">
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Enter password"
              onChange={props.handlePassword}
            />{" "}
          </FormGroup>
          <Row>
            <Col sm={3}>
              <Button
                className="buttons"
                variant="primary"
                type="button"
                onClick={() => props.handleLogin()}
              >
                Login
              </Button>
            </Col>{" "}
            <Col sm={9}>
              {/* <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={props.handleGoogleLogin}
                onFailure={props.handleGoogleLogin}
                cookiePolicy={"single_host_origin"}
              /> */}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  return <div>{showLoginPage}</div>;
}

// Export component to be used in other files
export default Login;
