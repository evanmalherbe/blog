import React from "react";

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

// Function to display rightpanel
function CreatePost(props) {
  return (
    <div className="bodyDiv">
      <LeftPanel />
      <div className="createPostDiv">
        <h1>Create New Post</h1>

        <Form id="createPostForm" autoComplete="off" className="createPostForm">
          <FormGroup className="mb-3">
            {" "}
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Choose a title for your post"
              onChange={props.handleTitle}
            />{" "}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Type your blog post here"
              onChange={props.handlePost}
            />{" "}
          </FormGroup>
          <Row>
            <Col sm={3}>
              <Button
                className="buttons"
                variant="primary"
                type="button"
                onClick={props.handleSavePost}
              >
                Save Post
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default CreatePost;
