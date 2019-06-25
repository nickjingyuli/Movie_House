import React, { Fragment, useEffect, useState } from "react";
import { Button, Icon, Loader, Rating } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRating } from "../../actions/movie";
import { getAllComments, submitComment } from "../../actions/comment";
import CommentItem from "./CommentItem";

const Comment = ({
  id,
  auth: { isAuthenticated, user },
  comment: { allComments, loading },
  getAllComments,
  submitComment
}) => {
  useEffect(() => {
    getAllComments(id);
  }, [getAllComments, id]);

  const [formState, setFormState] = useState(false);
  const [rate, setRate] = useState(5);
  const [formData, setFormData] = useState("");

  const toggleForm = () => {
    setFormState(!formState);
  };
  const handleRate = (e, { rating }) => {
    setRate(rating);
  };
  const handleChange = e => {
    setFormData(e.target.value);
  };
  const handleSubmit = () => {
    const body = {
      movieId: id,
      text: formData,
      movieRating: rate
    };
    submitComment(body);
    toggleForm();
  };

  return (
    isAuthenticated &&
    (!loading ? (
      <section className="bg-darker">
        {allComments.map(comment => comment.username).indexOf(user.username) ===
          -1 && (
          <Fragment>
            {formState && (
              <div className="form-container">
                <textarea
                  placeholder="Write something about this movie..."
                  className="cmt-form bg-dark"
                  onChange={e => handleChange(e)}
                  value={formData}
                />
                <Rating
                  icon="star"
                  maxRating={10}
                  rating={rate}
                  onRate={handleRate}
                  className="my-1"
                />
              </div>
            )}
            <div className="add-cmt">
              {formState && (
                <Button
                  inverted
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <span>Submit</span>
                </Button>
              )}
              <Button
                primary
                inverted
                onClick={() => {
                  toggleForm();
                }}
              >
                <span>{formState ? "Cancel" : "Add a comment"}</span>
              </Button>
            </div>
          </Fragment>
        )}
        {allComments.length > 0 && (
          <div className="my-1">
            <h1 className="large">
              <Icon name="comments outline" /> User comments
            </h1>
          </div>
        )}
        <div className="all-cmt-container">
          {allComments.map(comment => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      </section>
    ) : (
      <Loader active inline="centered" />
    ))
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  getAllComments: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  comment: state.comment
});

export default connect(
  mapStateToProps,
  {
    getRating,
    getAllComments,
    submitComment
  }
)(Comment);
