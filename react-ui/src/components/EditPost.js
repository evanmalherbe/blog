import React from "react";

import { Navigate } from "react-router-dom";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl, FormGroup, Row, Col } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

// Import custom stylesheet
import "../App.css";

// Function to display edit post form
function EditPost(props) {
  let showEditPostForm;

  console.log("Edit post received, author: " + props.author);

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  if (
    props.authMsg === "Success! Token valid." &&
    props.showEditPost === true
  ) {
    showEditPostForm = (
      <div className="editPostDiv">
        <h1>Edit Post</h1>

        <p>
          Post Author: <b>{props.author}</b>
        </p>
        <Form id="editPostForm" autoComplete="off" className="editPostForm">
          <FormGroup className="mb-3">
            {" "}
            <FormControl
              type="text"
              name="title"
              defaultValue={props.title}
              onChange={props.handleTitle}
            />{" "}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              name="post"
              defaultValue={props.post}
              onChange={props.handlePost}
            />{" "}
          </FormGroup>
          <Row>
            <Col sm={3}>
              <Button
                className="buttons"
                variant="primary"
                type="button"
                onClick={() => props.handleEditPost(props.id)}
              >
                Update Post
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  } else {
    showEditPostForm = <Navigate to="/" />;
  }

  return (
    <div className="bodyDiv">
      <LeftPanel />
      {showEditPostForm}
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default EditPost;
