import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Icon, Loader, Button } from "semantic-ui-react";
import { particleConfig1 } from "../../utils/particleConfig";
import SearchItem from "./SearchItem";
import Particles from "react-particles-js";

const Search = ({ auth: { user, loading } }) => {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(0);

  const sort = key => {
    let tmp = movies;
    tmp.sort((a, b) => {
      if (a.release_date < b.release_date) {
        return key;
      }
      if (a.release_date > b.release_date) {
        return -key;
      }
      return 0;
    });
    setMovies([...tmp]);
  };

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

  return (
    <div>
      <Particles params={particleConfig1} className="particle-overlay2" />
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <div className="search-container">
          <h1 className="my-1 x-large">Search</h1>
          <input
            className="search-bar bd-radius-big bg-darker p-1"
            type="text"
            placeholder="Type in movie name"
            onChange={e => handleChange(e)}
          />
          <div className="search-filter my-1">
            <span>
              <Button onClick={() => sort(1)}>From newest </Button>
            </span>
            <span>
              <Button onClick={() => sort(-1)}>From oldest </Button>
            </span>
          </div>
          <div className="search-result ">
            <div>
              {movies.length > 10 && (
                <Icon
                  size="big"
                  name="arrow circle left"
                  onClick={() => setCount(0)}
                  disabled={count === 0}
                />
              )}
            </div>
            <ul>
              {movies.slice(count * 10, count * 10 + 10).map(movie => (
                <li key={movie.id} className="p-1 bd-radius">
                  <SearchItem movie={movie} />
                </li>
              ))}
            </ul>
            <div>
              {movies.length > 10 && (
                <Icon
                  size="big"
                  name="arrow circle right"
                  onClick={() => setCount(1)}
                  disabled={count === 1}
                />
              )}
            </div>
          </div>
        </div>
      )}
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
