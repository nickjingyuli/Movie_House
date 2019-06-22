import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDBMovies } from "../../actions/movie";
import DisplayMovies from "./DisplayMovies";
import { Loader } from "semantic-ui-react";

const DBMovies = ({
  movies,
  movieState: { loading, DBMovies, DBMoviesGenres },
  getDBMovies
}) => {
  useEffect(() => {
    getDBMovies(movies);
  }, [getDBMovies, movies]);

  return loading ? (
    <Loader active inline="centered" />
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
