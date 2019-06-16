import React, { useEffect } from "react";
import { Label, Icon } from "semantic-ui-react";
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
    // document.body.classList.add("detail-bg");
    // return () => document.body.classList.remove("detail-bg");
  }, [getOneMovie, id]);

  return detailLoading ? (
    <Spinner />
  ) : (
    <div className="detail-container">
      <div className="top bg-dark">
        <div className="tp-lft">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
        </div>
        <div className="tp-rt">
          <div className="movie-info">
            <div className="basic-info">
              <h1>{currentMovie.title}</h1>
              <div className="genres my-1">
                {currentMovie.genres.map(genre => (
                  <Label color="black">{genre.name}</Label>
                ))}
              </div>
              <p>Released on: {currentMovie.release_date}</p>
              <p>Revenue: ${currentMovie.revenue}</p>
            </div>

            <div className="rating m-1">
              <div
                className={`c100 p${Math.round(
                  currentMovie.vote_average * 10
                )} green dark big`}
              >
                <span>{currentMovie.vote_average}</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
            </div>
            {/*<div className="company my-1">*/}
            {/*  <p>Produced by: </p>*/}
            {/*  {currentMovie.production_companies.map(comp => (*/}
            {/*    <p>{comp.name} </p>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>
          <div className="my-2">
            <p className="lead">{currentMovie.overview}</p>
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
