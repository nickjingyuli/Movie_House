import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLikedMovies } from "../../actions/movie";
import Spinner from "../layout/Spinner";
import DisplayLikes from "./DisplayLikes";

const Likes = ({
  movies,
  movieState: { loading, likedMovies, likedMoviesGenres },
  getLikedMovies
}) => {
  useEffect(() => {
    getLikedMovies(movies);
  }, [getLikedMovies]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {likedMovies.length === 0 ? (
        <h3>You haven't liked any movies</h3>
      ) : (
        <DisplayLikes all={likedMovies} movieGenres={likedMoviesGenres} />
      )}
    </Fragment>
  );
};

Likes.propTypes = {};

const mapStateToProps = state => ({
  movieState: state.movie
});

export default connect(
  mapStateToProps,
  { getLikedMovies }
)(Likes);
