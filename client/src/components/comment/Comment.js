import React, { Fragment, useEffect, useState } from "react";
import { Button, Loader, Rating } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRating } from "../../actions/movie";
import {
  // getUserComment,
  getAllComments,
  submitComment
} from "../../actions/comment";
import CommentItem from "./CommentItem";

const Comment = ({
  id,
  auth: { isAuthenticated, user },
  // movie: { currentRating, ratingLoading },
  comment: { userComment, allComments, loading },
  // getRating,
  // getUserComment,
  getAllComments,
  submitComment
}) => {
  useEffect(
    () => {
      // getRating(id);
      // getUserComment(id);
      getAllComments(id);
    },
    [getAllComments, id]
    // [getRating, getUserComment, id]
  );

  // const [cmtState, setCmtState] = useState("disabled");
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

  // const toggleCmtState = s => {
  //   setCmtState(s);
  // };

  return (
    isAuthenticated &&
    (!loading ? (
      <section className="bg-darker p-1">
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
        <div className="all-cmt-container ">
          {allComments.map(comment => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
        {/*{currentRating && (*/}
        {/*  <div className="comment-rating">*/}
        {/*    <h2>Rating for this movie based on comments</h2>*/}
        {/*    <div className="rating">*/}
        {/*      <div*/}
        {/*        className={`c100 p${Math.round(*/}
        {/*          currentRating * 10*/}
        {/*        )} orange dark small`}*/}
        {/*      >*/}
        {/*        <span>{currentRating}</span>*/}
        {/*        <div className="slice">*/}
        {/*          <div className="bar" />*/}
        {/*          <div className="fill" />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*{isAuthenticated &&*/}
        {/*  (userComment ? (*/}
        {/*    <CommentForm*/}
        {/*      id={id}*/}
        {/*      currentState={cmtState}*/}
        {/*      toggle={toggleCmtState}*/}
        {/*    />*/}
        {/*  ) : (*/}
        {/*    <CommentForm id={id} currentState={"add"} toggle={toggleCmtState} />*/}
        {/*  ))}*/}
      </section>
    ) : (
      <Loader active inline="centered" />
    ))
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  // movie: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  // getRating: PropTypes.func.isRequired,
  // getUserComment: PropTypes.func.isRequired,
  getAllComments: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  // movie: state.movie,
  comment: state.comment
});

export default connect(
  mapStateToProps,
  {
    getRating,
    // getUserComment,
    getAllComments,
    submitComment
  }
)(Comment);
