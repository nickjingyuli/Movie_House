import React, { Fragment } from "react";
import { Button, Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CommentForm = ({ currentState, userComment, toggle }) => {
  return (
    <Fragment>
      <Form size="big" className="comment-form">
        <Form.Field>
          {currentState !== "add" ? <p>Your comment</p> : <p>Make a comment</p>}
          <Form.TextArea
            value={userComment && userComment.text}
            placeholder={
              currentState === "add" && `Write something about this movie...`
            }
            style={{ background: "#333", color: "white" }}
            disabled={currentState === "disabled"}
          />
          {currentState === "disabled" ? (
            <Button inverted onClick={() => toggle("edit")}>
              Edit your comment
            </Button>
          ) : (
            <Button color="grey" inverted type="submit">
              Submit
            </Button>
          )}
        </Form.Field>
      </Form>
    </Fragment>
  );
};

CommentForm.propTypes = {
  currentState: PropTypes.string.isRequired,
  userComment: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userComment: state.comment.userComment
});

export default connect(
  mapStateToProps,
  {}
)(CommentForm);
