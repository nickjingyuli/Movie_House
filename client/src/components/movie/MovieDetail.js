import React, { useEffect } from "react";
import { Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOneMovie } from "../../actions/movie";
import Spinner from "../layout/Spinner";

const MovieDetail = ({
  match: {
    params: { id }
  },
  movie: { detailLoading, currentMovie },
  getOneMovie
}) => {
  useEffect(() => {
    getOneMovie(id);
  }, [getOneMovie, id]);

  return detailLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className="top">
        <div className="card-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
        </div>
        <div className="movie-info">
          <h1>{currentMovie.title}</h1>
          <div className="genres">
            {currentMovie.genres.map(genre => (
              <Label color="black">{genre.name}</Label>
            ))}
          </div>
          <div className="company">
            <p>Produced by: </p>
            {currentMovie.production_companies.map(comp => (
              <p>{comp.name}</p>
            ))}
          </div>
          <p>Released on: {currentMovie.release_date}</p>
          <p>
            Revenue:{" "}
            <Label as="a" color="teal">
              ${currentMovie.revenue}
            </Label>
          </p>
          <div className="rating">
            <div
              className={`c100 p${Math.round(
                currentMovie.vote_average * 10
              )} big green`}
            >
              <span>{currentMovie.vote_average}</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieDetail.propTypes = {
  movie: PropTypes.object.isRequired,
  getOneMovie: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { getOneMovie }
)(MovieDetail);
