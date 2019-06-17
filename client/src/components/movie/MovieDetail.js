import React, { Fragment, useEffect } from "react";
import { Label, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getOneMovie,
  likeAMovie,
  unlikeAMovie,
  wishAMovie,
  unwishAMovie
} from "../../actions/movie";
import Spinner from "../layout/Spinner";

const MovieDetail = ({
  match: {
    params: { id }
  },
  auth: { isAuthenticated, user },
  movie: { detailLoading, currentMovie },
  getOneMovie,
  likeAMovie,
  unlikeAMovie,
  wishAMovie,
  unwishAMovie
}) => {
  useEffect(() => {
    getOneMovie(id);
    // document.body.classList.add("detail-bg");
    // return () => document.body.classList.remove("detail-bg");
  }, [getOneMovie, id]);

  const handleLike = () => {
    if (user.likedMovies && currentMovie) {
      if (
        user.likedMovies
          .map(item => item.movieId)
          .indexOf(currentMovie.id.toString()) > -1
      ) {
        unlikeAMovie(currentMovie.id);
      } else {
        likeAMovie(currentMovie.id);
      }
    }
  };
  const handleWatch = () => {
    if (user.watchLater && currentMovie) {
      if (
        user.watchLater
          .map(item => item.movieId)
          .indexOf(currentMovie.id.toString()) > -1
      ) {
        unwishAMovie(currentMovie.id);
      } else {
        wishAMovie(currentMovie.id);
      }
    }
  };

  return detailLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="top bg-dark">
        <section className="tp-lft">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
        </section>
        <section className="tp-rt">
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
              {isAuthenticated && user && (
                <div className="icons">
                  <Icon
                    name={
                      user.likedMovies
                        ? user.likedMovies
                            .map(item => item.movieId)
                            .indexOf(currentMovie.id.toString()) > -1
                          ? "heart"
                          : "heart outline"
                        : "heart outline"
                    }
                    color={
                      user.likedMovies
                        ? user.likedMovies
                            .map(item => item.movieId)
                            .indexOf(currentMovie.id.toString()) > -1
                          ? "red"
                          : "white"
                        : "white"
                    }
                    size="large"
                    title="Likes"
                    onClick={() => handleLike()}
                  />
                  <Icon
                    name={
                      user.watchLater
                        ? user.watchLater
                            .map(item => item.movieId)
                            .indexOf(currentMovie.id.toString()) > -1
                          ? "check circle"
                          : "check circle outline"
                        : "check circle outline"
                    }
                    color={
                      user.watchLater
                        ? user.watchLater
                            .map(item => item.movieId)
                            .indexOf(currentMovie.id.toString()) > -1
                          ? "blue"
                          : "white"
                        : "white"
                    }
                    size="large"
                    title="Wish List"
                    onClick={() => handleWatch()}
                  />
                </div>
              )}
            </div>

            <div className="rating m-2">
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
          <div>
            <p className="lead">{currentMovie.overview}</p>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

MovieDetail.propTypes = {
  movie: PropTypes.object.isRequired,
  getOneMovie: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  likeAMovie: PropTypes.func.isRequired,
  unlikeAMovie: PropTypes.func.isRequired,
  wishAMovie: PropTypes.func.isRequired,
  unwishAMovie: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getOneMovie, likeAMovie, unlikeAMovie, wishAMovie, unwishAMovie }
)(MovieDetail);
