import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { clearAlert } from "../../actions/alert";

const Register = ({ isAuthenticated, login, clearAlert, alerts }) => {
  useEffect(() => {
    clearAlert();
  }, [clearAlert]);

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  // Get the alerts
  let allAlerts = [];
  if (alerts.length > 0) {
    alerts.forEach(alert => allAlerts.push(alert.msg));
  }

  // Redirect after register
  if (isAuthenticated) {
    clearAlert();
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="x-large">Login</h1>
      <Form
        size="big"
        onSubmit={e => handleSubmit(e)}
        error={allAlerts.length > 0}
      >
        <Message error header="Something went wrong" list={[...allAlerts]} />
        <Form.Field>
          <label>Username</label>
          <input
            name="username"
            value={username}
            onChange={e => handleChange(e)}
            placeholder="Username"
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name="password"
            value={password}
            onChange={e => handleChange(e)}
            placeholder="Password"
            type="password"
            required
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>

      <p className="my-2">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  clearAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { login, clearAlert }
)(Register);
