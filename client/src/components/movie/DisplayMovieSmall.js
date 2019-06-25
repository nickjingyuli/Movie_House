import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import MovieItem from "./MovieItem";

const options = [
  { key: "all", value: "all", text: "All" },
  { key: "action", value: "action", text: "Action" },
  { key: "adventure", value: "adventure", text: "Adventure" },
  { key: "animation", value: "animation", text: "Animation" },
  { key: "comedy", value: "comedy", text: "comedy" },
  { key: "crime", value: "crime", text: "crime" },
  { key: "documentary", value: "documentary", text: "Documentary" },
  { key: "drama", value: "drama", text: "Drama" },
  { key: "family", value: "family", text: "Family" },
  { key: "fantasy", value: "fantasy", text: "Fantasy" },
  { key: "history", value: "history", text: "History" },
  { key: "horror", value: "horror", text: "Horror" },
  { key: "music", value: "music", text: "Music" },
  { key: "mystery", value: "mystery", text: "Mystery" },
  { key: "romance", value: "romance", text: "Romance" },
  { key: "scienceFiction", value: "scienceFiction", text: "Science Fiction" },
  { key: "tvMovie", value: "tvMovie", text: "TV Movie" },
  { key: "thriller", value: "thriller", text: "Thriller" },
  { key: "war", value: "war", text: "War" },
  { key: "western", value: "western", text: "Western" }
];

const DisplayMoviesSmall = ({ all, movieGenres }) => {
  const [data, setData] = useState({
    searchQuery: null,
    value: "all"
  });

  const handleChange = (e, { value }) => setData({ ...data, value: value });

  const handleSearchChange = (e, { searchQuery }) =>
    setData({ ...data, searchQuery: searchQuery });

  return (
    <Fragment>
      <Dropdown
        className="my-1"
        placeholder="Search a genre"
        fluid
        selection
        search={true}
        value={data.value}
        options={options}
        onChange={handleChange}
        onSearchChange={handleSearchChange}
      />

      {data.value === "all" ? (
        <div className="poster-container">
          {all.length > 0 ? (
            all.map(item => (
              <Link key={item.id} to={`/detail/${item.id}`}>
                <MovieItem movie={item} />
              </Link>
            ))
          ) : (
            <Fragment>
              <br />
              <br />
              <br />
            </Fragment>
          )}
        </div>
      ) : (
        <div className="poster-container">
          {movieGenres[`${data.value}`].length > 0 ? (
            movieGenres[`${data.value}`].map(item => (
              <Link key={item.id} to={`/detail/${item.id}`}>
                <MovieItem movie={item} />
              </Link>
            ))
          ) : (
            <Fragment>
              <br />
              <br />
              <br />
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

DisplayMoviesSmall.propTypes = {
  all: PropTypes.array.isRequired,
  movieGenres: PropTypes.object.isRequired
};

export default DisplayMoviesSmall;
