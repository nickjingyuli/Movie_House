import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

import PropTypes from "prop-types";

class DBMovieItem extends Component {
  state = {
    imgUrl: `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.movie.poster_path !== this.props.movie.poster_path) {
      this.setState({
        imgUrl: `https://image.tmdb.org/t/p/w500/${
          this.props.movie.poster_path
        }`
      });
    }
  }

  render() {
    return (
      <div className="card-container m-1" key={this.props.movie.id}>
        <img src={this.state.imgUrl} alt={this.props.movie.title} />
        <div className="movie-overlay bd-radius">
          <h5>{this.props.movie.title}</h5>
          <Rating
            className="rating"
            icon="star"
            defaultRating={this.props.movie.vote_average * 0.5}
            maxRating={5}
            disabled
          />
        </div>
      </div>
    );
  }
}

DBMovieItem.propTypes = {
  movie: PropTypes.object.isRequired
};

export default DBMovieItem;
