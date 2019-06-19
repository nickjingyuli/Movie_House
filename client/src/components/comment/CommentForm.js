import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Rating } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitComment } from "../../actions/comment";

const CommentForm = ({
  id,
  currentState,
  userComment,
  currentRating,
  toggle,
  submitComment
}) => {
  useEffect(() => {
    setFormData(userComment ? userComment.text : "");
    setRate(currentRating);
  }, [userComment, currentRating]);

  const [formData, setFormData] = useState("");
  const [rate, setRate] = useState(currentRating);

  const handleChange = e => {
    setFormData(e.target.value);
  };

  const handleRate = (e, { rating }) => {
    setRate(rating);
  };

  const handleSubmit = e => {
    e.preventDefault();
    toggle("disabled");
    const body = {
      movieId: id,
      text: formData,
      movieRating: rate
    };
    submitComment(body);
  };

  return (
    <Fragment>
      <Form size="big" className="comment-form">
        <Form.Field>
          {currentState !== "add" ? <p>Your comment</p> : <p>Make a comment</p>}
          <Rating
            icon="star"
            disabled={currentState === "disabled"}
            rating={rate}
            maxRating={10}
            onRate={handleRate}
          />
          <Form.TextArea
            value={formData}
            onChange={e => handleChange(e)}
            placeholder={
              currentState === "add"
                ? "Write something about this movie..."
                : ""
            }
            style={{ background: "#333", color: "white" }}
            disabled={currentState === "disabled"}
          />
          {currentState === "disabled" ? (
            <Button inverted onClick={() => toggle("edit")}>
              Edit your comment
            </Button>
          ) : (
            <Button
              color="grey"
              inverted
              type="submit"
              onClick={e => handleSubmit(e)}
            >
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
  // userComment: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  userComment: state.comment.userComment,
  currentRating: state.movie.currentRating
});

export default connect(
  mapStateToProps,
  { submitComment }
)(CommentForm);
