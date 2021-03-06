import React, { Fragment, useState } from "react";
import { Form, Icon, Radio, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DBMovies from "./DBMovies";

const Dashboard = ({ auth }) => {
  const [value, setValue] = useState("like");

  const handleChange = (e, { value }) => {
    setValue(value);
  };

  return auth.loading ? (
    <Loader active inline="centered" />
  ) : (
    <Fragment>
      <div className="liked-movies-container">
        <h1 className="x-large">Welcome back {auth.user.username}!</h1>
        <Form inverted>
          <Form.Group inline>
            <Form.Field>
              <Radio
                label="Liked Movies"
                name="radioGroup"
                value="like"
                checked={value === "like"}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Wish List"
                name="radioGroup"
                value="wish"
                checked={value === "wish"}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        {value === "like" ? (
          <h3>
            <Icon name="heart" color="red" />
            <span className="hide-sm">Movies you liked</span>
          </h3>
        ) : (
          <h3>
            <Icon name="check" color="blue" />{" "}
            <span className="hide-sm"> Movies in your wish list</span>
          </h3>
        )}
        <DBMovies
          movies={
            value === "like" ? auth.user.likedMovies : auth.user.watchLater
          }
        />
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
