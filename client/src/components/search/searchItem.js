import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const SearchItem = ({ movie }) => {
  return (
    <Fragment>
      <p>
        {movie.title} ({<Moment format="YYYY">{movie.release_date}</Moment>})
      </p>
    </Fragment>
  );
};

SearchItem.propTypes = {
  movie: PropTypes.object.isRequired
};

export default SearchItem;
