import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRating } from "../../actions/movie";
import { getUserComment } from "../../actions/comment";
import CommentForm from "./CommentForm";
import Spinner from "../../components/layout/Spinner";
const Comment = ({
  id,
  auth: { isAuthenticated },
  movie: { currentRating, ratingLoading },
  comment: { userComment, loading },
  getRating,
  getUserComment
}) => {
  useEffect(() => {
    getRating(id);
    getUserComment(id);
  }, [getRating, getUserComment, id]);

  const [cmtState, setCmtState] = useState("disabled");

  const toggleCmtState = s => {
    setCmtState(s);
  };

  return !ratingLoading && !loading ? (
    <section className="comment-container bg-dark">
      {currentRating && (
        <div className="comment-rating">
          <h2>Rating for this movie based on comments</h2>
          <div className="rating">
            <div
              className={`c100 p${Math.round(
                currentRating * 10
              )} orange dark small`}
            >
              <span>{currentRating}</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated &&
        (userComment ? (
          <CommentForm
            id={id}
            currentState={cmtState}
            toggle={toggleCmtState}
          />
        ) : (
          <CommentForm id={id} currentState={"add"} toggle={toggleCmtState} />
        ))}
    </section>
  ) : (
    <Spinner />
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  getRating: PropTypes.func.isRequired,
  getUserComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movie: state.movie,
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getRating, getUserComment }
)(Comment);
