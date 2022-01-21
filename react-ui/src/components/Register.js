import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl, FormGroup, Row, Col } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display rightpanel
function Register(props) {
  return (
    <div className="registerDiv">
      <h1>Register</h1>
      {/* Learned how to turn autocomplete off here: 
      https://reactgo.com/react-turn-off-autocomplete/ */}
      <Form id="registerForm" autoComplete="off" className="registerForm">
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
              onClick={props.handleRegister}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

// Export component to be used in other files
export default Register;
