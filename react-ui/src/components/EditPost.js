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
function EditPost(
  authMsg,
  id,
  title,
  post,
  author,
  handleTitle,
  handlePost,
  handleEditPost
) {
  let showEditPost;

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  if (authMsg === "Success! Token valid.") {
    showEditPost = (
      <div className="EditPostDiv">
        <h1>Edit Post</h1>

        <p>
          Post Author: <b>{author}</b>
        </p>
        <Form id="editPostForm" autoComplete="off" className="editPostForm">
          <FormGroup className="mb-3">
            {" "}
            <FormControl
              type="text"
              name="title"
              placeholder={title}
              onChange={handleTitle}
            />{" "}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              name="post"
              placeholder={post}
              onChange={handlePost}
            />{" "}
          </FormGroup>
          <Row>
            <Col sm={3}>
              <Button
                className="buttons"
                variant="primary"
                type="button"
                onClick={() => handleEditPost(id)}
              >
                Update Post
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  } else {
    showEditPost = <Navigate to="/" />;
  }

  return (
    <div className="bodyDiv">
      <LeftPanel />
      {showEditPost}
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default EditPost;
