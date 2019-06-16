import React, { Fragment, useState } from "react";
import { Form, Radio } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DBMovies from "./DBMovies";

const Dashboard = ({ auth }) => {
  const [value, setValue] = useState("like");

  const handleChange = (e, { value }) => {
    setValue(value);
  };

  return auth.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="x-large">Welcome back {auth.user.username}!</h1>
      <div className="liked-movies-container">
        <Form>
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
          <h3>Movies you liked</h3>
        ) : (
          <h3>Movies in your wish list</h3>
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
