import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRating } from "../../actions/movie";
import CommentForm from "./CommentForm";

const Comment = ({
  id,
  auth: { isAuthenticated },
  movie: { currentRating }
}) => {
  useEffect(() => {
    getRating(id);
  }, [getRating, id]);
  return (
    <section className="comment-container bg-dark">
      {currentRating && (
        <div className="comment-rating">
          <h2>Rating for this movie based on comments</h2>
          <div className="rating">
            <div className={`c100 p50 orange dark small`}>
              <span>50%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && <CommentForm />}
    </section>
  );
};

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getRating }
)(Comment);
