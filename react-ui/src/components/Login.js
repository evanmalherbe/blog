import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display rightpanel
function Login(props) {
  return (
    <div className="loginDiv">
      <h1>Log in</h1>
      {/* Learned how to turn autocomplete off here: 
      https://reactgo.com/react-turn-off-autocomplete/ */}
      <Form id="loginForm" autoComplete="off" className="loginForm">
        <FormControl
          type="text"
          name="toAdd"
          placeholder="Enter username"
          onChange={props.handleUsername}
        />{" "}
        <FormControl
          type="text"
          name="toAdd"
          placeholder="Enter password"
          onChange={props.handlePassword}
        />{" "}
        <Button
          className="buttons"
          variant="primary"
          type="button"
          onClick={props.handleLogin}
        >
          Login
        </Button>
        <Button
          className="buttons"
          variant="primary"
          type="button"
          onClick={props.handleRegister}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

// Export component to be used in other files
export default Login;
