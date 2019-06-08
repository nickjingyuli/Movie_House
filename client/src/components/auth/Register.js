import React, { Fragment, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { Redirect } from "react-router-dom";

const Register = ({ isAuthenticated, register, alerts }) => {
  const [formData, setFormData] = useState({
    username: "",
    birthday: "",
    password: "",
    password2: ""
  });

  const [list, setList] = useState([]);

  const { username, birthday, password, password2 } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    let tmpList = [];
    const bday = new Date(birthday);
    const today = new Date();
    if (bday.getTime() > today.getTime()) {
      tmpList.push("Birthday entered is after today");
    }
    if (password !== password2) {
      tmpList.push("Passwords entered are not the same");
    }
    if (tmpList.length > 0) {
      setList(tmpList);
    } else {
      setList([]);
      register({ username, password, birthday });
    }
  };

  // Get the alerts
  let allAlerts = [];
  if (alerts.length > 0) {
    alerts.forEach(alert => allAlerts.push(alert.msg));
  }

  // Redirect after register
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <p className="x-large">Sign Up</p>
      <Form
        size="big"
        onSubmit={e => handleSubmit(e)}
        error={list.length > 0 || allAlerts.length > 0}
      >
        <Message
          error
          header="Something went wrong"
          list={[...list, ...allAlerts]}
        />
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
          <label>Birthday</label>
          <input
            name="birthday"
            value={birthday}
            onChange={e => handleChange(e)}
            type="date"
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
            minLength={6}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
            name="password2"
            value={password2}
            onChange={e => handleChange(e)}
            placeholder="Confirm Password"
            type="password"
            required
            minLength={6}
          />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
    </Fragment>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
