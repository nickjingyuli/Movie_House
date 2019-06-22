import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";

const Search = ({ auth: { user, loading } }) => {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);

  const handleChange = e => {
    setValue(e.target.value);
    searchMovie();
  };

  const searchMovie = async () => {
    if (value === "") {
      return;
    }
    let url = `https://api.themoviedb.org/3/search/movie?api_key=57597e10d2a4be7b31ce5f3098929194&language=en-US&query=${value}&include_adult=${
      user
        ? Math.floor(
            (new Date() - user.birthday) / (1000 * 3600 * 24 * 365) >= 18
          )
        : false
    }`;
    if (localStorage.token) {
      delete axios.defaults.headers.common["x-auth-token"];
    }
    const res = await axios.get(url);
    setMovies(res.data.results);
    if (localStorage.token) {
      axios.defaults.headers.common["x-auth-token"] = localStorage.token;
    }
  };

  return loading ? (
    <Loader active inline="centered" />
  ) : (
    <div className="search-container">
      <input
        className="search-bar bd-radius-big bg-darker p-1"
        type="text"
        placeholder="Type in movie name"
        onChange={e => handleChange(e)}
      />
      <p>{console.log(movies)}</p>
    </div>
  );
};

Search.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Search);
