import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRating } from "../../actions/movie";
import { getUserComment, getAllComments } from "../../actions/comment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Comment = ({
  id,
  auth: { isAuthenticated },
  movie: { currentRating, ratingLoading },
  comment: { userComment, allComments, loading },
  getRating,
  getUserComment,
  getAllComments
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

  const [cmtState, setCmtState] = useState("disabled");

  const toggleCmtState = s => {
    setCmtState(s);
  };

  return !loading ? (
    <section className="bg-darker p-1">
      <div className="all-cmt-container ">
        {allComments.map(comment => (
          <CommentItem comment={comment} />
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
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  getRating: PropTypes.func.isRequired,
  getUserComment: PropTypes.func.isRequired,
  getAllComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movie: state.movie,
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getRating, getUserComment, getAllComments }
)(Comment);
