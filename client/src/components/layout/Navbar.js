import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

//@todo: WHen logged in change link

const Navbar = props => {
  return (
    <nav className="navbar bg-dark">
      <Link to="/">
        <h1>
          <Icon name="coffee" /> Movie House
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Movies</Link>
        </li>
        <li>
          <Link to="register">Register</Link>
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
