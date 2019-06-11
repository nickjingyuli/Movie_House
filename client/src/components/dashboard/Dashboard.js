import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getLikedMovies } from "../../actions/movie";
import MovieItem from "../movie/MovieItem";
import { loadUser } from "../../actions/auth";

const Dashboard = ({
  auth,
  getLikedMovies,
  loadUser,
  movie: { likedMovies, watchLater, loading }
}) => {
  useEffect(() => {
    !auth.loading && getLikedMovies(auth.user.likedMovies);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="x-large">Welcome {auth.user.username}!</h1>
      <div className="liked-movies-container">
        <h3>Movies you liked</h3>
        <div className="liked-movies">
          {likedMovies.map(movie => (
            <div key={movie.id}>{movie.id}</div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  getLikedMovies: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getLikedMovies, loadUser }
)(Dashboard);
