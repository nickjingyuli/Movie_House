import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Icon, Loader, Dropdown } from "semantic-ui-react";
import { particleConfig1 } from "../../utils/particleConfig";
import SearchItem from "./SearchItem";
import Particles from "react-particles-js";

const options = [
  { key: "newest", value: "newest", text: "by newest" },
  { key: "oldest", value: "oldest", text: "by oldest" }
];

const Search = ({ auth: { user, loading } }) => {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(0);
  const [sortValue, setSortValue] = useState("");

  const handleChange = (e, { value }) => {
    sort(value === "newest" ? 1 : -1);
    setSortValue(value);
  };

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

  const searchMovie = async e => {
    if (e.target.value === "") {
      return;
    }
    let url = `https://api.themoviedb.org/3/search/movie?api_key=57597e10d2a4be7b31ce5f3098929194&language=en-US&query=${
      e.target.value
    }&include_adult=${
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
            value={value}
            onChange={e => {
              setValue(e.target.value);
              searchMovie(e);
            }}
          />
          {movies.length > 2 && (
            <div className="search-filter my-1">
              <Dropdown
                compact
                placeholder="Sort by"
                selection
                value={sortValue}
                options={options}
                onChange={handleChange}
              />
            </div>
          )}

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
