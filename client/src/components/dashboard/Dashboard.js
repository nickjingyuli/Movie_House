import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Likes from "./Likes";

const Dashboard = ({ auth }) => {
  return auth.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="x-large">Welcome back {auth.user.username}!</h1>
      <div className="liked-movies-container">
        <h3>Movies you liked</h3>
        <Likes movies={auth.user.likedMovies} />
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movie: state.movie
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
