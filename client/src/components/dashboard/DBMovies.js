import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDBMovies } from "../../actions/movie";
import Spinner from "../layout/Spinner";
import DisplayMovies from "./DisplayMovies";

const DBMovies = ({
  movies,
  movieState: { loading, DBMovies, DBMoviesGenres },
  getDBMovies
}) => {
  useEffect(() => {
    getDBMovies(movies);
  }, [getDBMovies, movies]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {DBMovies.length === 0 ? (
        <h3>No movie</h3>
      ) : (
        <DisplayMovies all={DBMovies} movieGenres={DBMoviesGenres} />
      )}
    </Fragment>
  );
};

DBMovies.propTypes = {
  movieState: PropTypes.object.isRequired,
  getDBMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  movieState: state.movie
});

export default connect(
  mapStateToProps,
  { getDBMovies }
)(DBMovies);
