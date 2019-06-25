import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { loading, isAuthenticated }, logout, history }) => {
  const redirect = page => {
    history.push(`/${page}`);
  };
  const guestLinks = (
    <ul>
      <li>
        <Dropdown
          text={
            <Fragment>
              <Icon name="film" />
              <span className="hide-sm">Movies</span>
            </Fragment>
          }
          icon=""
          className="drop"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="search"
              text="search"
              onClick={() => redirect("search")}
            />
            <Dropdown.Item
              icon="trophy"
              text="Trending"
              onClick={() => redirect("trending")}
            />
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li>
        <Link to="/register">
          <Icon name="signup" /> <span className="hide-sm">Register </span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <Icon name="sign-in" /> <span className="hide-sm">Login</span>
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Dropdown
          text={
            <Fragment>
              <Icon name="film" />
              <span className="hide-sm">Movies</span>
            </Fragment>
          }
          icon=""
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="search"
              text="search"
              onClick={() => redirect("search")}
            />
            <Dropdown.Item
              icon="trophy"
              text="Trending"
              onClick={() => redirect("trending")}
            />
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li>
        <Link to="/dashboard">
          <Icon name="user circle" /> <span className="hide-sm">Dashboard</span>{" "}
        </Link>
      </li>
      <li>
        <a onClick={logout} href="">
          <Icon name="sign-out" /> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <Icon name="home" /> <span className="hide-sm">Movie House</span>
        </Link>
      </h1>
      <Fragment>
        {!loading && (isAuthenticated ? authLinks : guestLinks)}
      </Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Navbar));
