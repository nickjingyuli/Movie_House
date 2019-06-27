import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMovies } from "../../actions/movie";
import DisplayMovies from "../movie/DisplayMovies";
import { Loader } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import DisplayMoviesSmall from "../movie/DisplayMovieSmall";

const DBMovies = ({
  movies,
  movieState: { loading, Movies, MoviesGenres },
  getMovies
}) => {
  useEffect(() => {
    getMovies(movies);
  }, [getMovies, movies]);

  return loading ? (
    <Loader active inline="centered" />
  ) : (
    <Fragment>
      {Movies.length === 0 ? (
        <h3 className="large my-1">No movies found!</h3>
      ) : (
        <Fragment>
          <MediaQuery minWidth={700}>
            <DisplayMovies all={Movies} movieGenres={MoviesGenres} />
          </MediaQuery>
          <MediaQuery maxWidth={700}>
            <DisplayMoviesSmall movieGenres={MoviesGenres} all={Movies} />
          </MediaQuery>
        </Fragment>
      )}
    </Fragment>
  );
};

DBMovies.propTypes = {
  movieState: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  movieState: state.movie
});

export default connect(
  mapStateToProps,
  { getMovies }
)(DBMovies);
