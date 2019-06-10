import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const Dashboard = ({ auth }) => {
  // const allLikeIds = auth.user.likedMovies.forEach(movie => movie.movieId);

  return auth.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="x-large">Welcome {auth.user.username}!</h1>
      <div className="liked-movies" />
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
