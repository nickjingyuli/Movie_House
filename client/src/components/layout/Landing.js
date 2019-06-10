import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="landing-container">
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Movie House</h1>
            <p className="lead">
              A place to get information about movies and share your thoughts.
            </p>
            <div className="buttons">
              <Link to="/register">
                <Button inverted color="teal">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button inverted color="teal">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
