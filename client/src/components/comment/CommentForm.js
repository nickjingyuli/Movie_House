import React, { Fragment } from "react";
import { Button, Form } from "semantic-ui-react";
import PropTypes from "prop-types";

const CommentForm = props => {
  return (
    <Fragment>
      <Form size="big" className="form m-3">
        <Form.Field>
          <p>Comment</p>
          <Form.TextArea
            placeholder="Write something about this movie..."
            style={{ background: "#333", color: "white" }}
          />
          <Button color="grey" inverted type="submit">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </Fragment>
  );
};

CommentForm.propTypes = {};

export default CommentForm;
