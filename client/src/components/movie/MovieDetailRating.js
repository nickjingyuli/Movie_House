import React, { Fragment } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";

const MovieDetailRating = ({ currentMovie }) => {
  return (
    <Fragment>
      <MediaQuery minWidth={945}>
        <div
          className={`c100 p${Math.round(
            currentMovie.vote_average * 10
          )} green dark big`}
        >
          <span>{currentMovie.vote_average}</span>
          <div className="slice">
            <div className="bar" />
            <div className="fill" />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={944}>
        <div
          className={`c100 p${Math.round(
            currentMovie.vote_average * 10
          )} green dark normal`}
        >
          <span>{currentMovie.vote_average}</span>
          <div className="slice">
            <div className="bar" />
            <div className="fill" />
          </div>
        </div>
      </MediaQuery>
    </Fragment>
  );
};

MovieDetailRating.propTypes = {
  currentMovie: PropTypes.object.isRequired
};

export default MovieDetailRating;
