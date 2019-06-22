import React, { Fragment, useEffect } from "react";
import Moment from "react-moment";
import { Label, Icon, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getOneMovie,
  likeAMovie,
  unlikeAMovie,
  wishAMovie,
  unwishAMovie
} from "../../actions/movie";
import Comment from "../comment/Comment";

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
    <Loader active inline="centered" />
  ) : (
    <Fragment>
      <div className="bg-darker p-1 bd-radius-big">
        <section className="top">
          <div className="tp-lft">
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                currentMovie.poster_path
              }`}
              alt={currentMovie.title}
              className="bd-radius"
            />
          </div>
          <div className="tp-rt">
            <div className="movie-info">
              <div className="basic-info">
                <h1>{currentMovie.title}</h1>
                <div className="genres my-1">
                  {currentMovie.genres.map(genre => (
                    <Label key={genre.name} color="black">
                      {genre.name}
                    </Label>
                  ))}
                </div>
                <p>
                  Released on:{" "}
                  <Moment format="YYYY/MM/DD">
                    {currentMovie.release_date}
                  </Moment>
                </p>
                <p>
                  Revenue:{" "}
                  {currentMovie.revenue > 0 && `$ ${currentMovie.revenue}`}
                </p>
                <a href={currentMovie.homepage} target="_blank">
                  Movie Homepage
                </a>
                {isAuthenticated && user && (
                  <div className="icons my-1">
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
                            : "grey"
                          : "grey"
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
                            : "grey"
                          : "grey"
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
            </div>
            <div>
              <p className="lead">{currentMovie.overview}</p>
            </div>
          </div>
        </section>
        <Comment id={currentMovie.id} />
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
