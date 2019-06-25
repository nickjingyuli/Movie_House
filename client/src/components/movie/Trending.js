import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPopMovies } from "../../actions/movie";
import { Loader } from "semantic-ui-react";
import DisplayMovies from "./DisplayMovies";
import MediaQuery from "react-responsive";
import DisplayMoviesSmall from "./DisplayMovieSmall";

const Trending = ({
  movie: { Movies, MoviesGenres, loading },
  getPopMovies
}) => {
  useEffect(() => {
    getPopMovies();
  }, [getPopMovies]);

  return loading ? (
    <Loader active inline="centered" />
  ) : (
    <Fragment>
      <h1 className="x-large" style={{ textAlign: "center" }}>
        Trending
      </h1>
      <Fragment>
        <MediaQuery minWidth={700}>
          <DisplayMovies all={Movies} movieGenres={MoviesGenres} />
        </MediaQuery>
        <MediaQuery maxWidth={700}>
          <DisplayMoviesSmall movieGenres={MoviesGenres} all={Movies} />
        </MediaQuery>
      </Fragment>
    </Fragment>
  );
};

Trending.propTypes = {
  movie: PropTypes.object.isRequired,
  getPopMovies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getPopMovies }
)(Trending);
