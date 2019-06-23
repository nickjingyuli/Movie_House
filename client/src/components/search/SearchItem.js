import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchItem = ({ movie }) => {
  return (
    <Fragment>
      <Link to={`/detail/${movie.id}`}>
        <p>
          {movie.title} ({movie.release_date.slice(0, 4)})
        </p>
      </Link>
    </Fragment>
  );
};

SearchItem.propTypes = {
  movie: PropTypes.object.isRequired
};

export default SearchItem;
