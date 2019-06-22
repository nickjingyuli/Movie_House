import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Tab } from "semantic-ui-react";
import DBMovieItem from "../movie/DBMovieItem";

const DisplayMovies = ({ all, movieGenres }) => {
  const panes = [
    {
      menuItem: "All",
      render: () =>
        movieGenres.action.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {all.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Action",
      render: () =>
        movieGenres.action.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.action.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Adventure",
      render: () =>
        movieGenres.adventure.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.adventure.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Animation",
      render: () =>
        movieGenres.animation.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.animation.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Comedy",
      render: () =>
        movieGenres.comedy.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.comedy.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Crime",
      render: () =>
        movieGenres.crime.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.crime.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Documentary",
      render: () =>
        movieGenres.documentary.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.documentary.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Drama",
      render: () =>
        movieGenres.drama.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.drama.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Family",
      render: () =>
        movieGenres.family.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.family.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Fantasy",
      render: () =>
        movieGenres.fantasy.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.fantasy.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "History",
      render: () =>
        movieGenres.history.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.history.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Horror",
      render: () =>
        movieGenres.horror.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.horror.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Music",
      render: () =>
        movieGenres.music.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.music.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Mystery",
      render: () =>
        movieGenres.mystery.length === 0 ? (
          <Tab.Pane romance attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane romance attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.mystery.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Romance",
      render: () =>
        movieGenres.romance.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.romance.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Science Fiction",
      render: () =>
        movieGenres.scienceFiction.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.scienceFiction.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "TV Movie",
      render: () =>
        movieGenres.tvMovie.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.tvMovie.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Thriller",
      render: () =>
        movieGenres.thriller.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.thriller.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "War",
      render: () =>
        movieGenres.war.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.war.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    },
    {
      menuItem: "Western",
      render: () =>
        movieGenres.western.length === 0 ? (
          <Tab.Pane attached={false} color="grey" inverted>
            <p className="lead">No movie here </p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false} color="grey" inverted>
            <div className="poster-container">
              {movieGenres.western.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`}>
                  <DBMovieItem movie={item} />
                </Link>
              ))}
            </div>
          </Tab.Pane>
        )
    }
  ];
  return (
    <Fragment>
      <Tab
        menu={{ color: "grey", inverted: true, fluid: true, vertical: true }}
        panes={panes}
      />
    </Fragment>
  );
};

DisplayMovies.propTypes = {
  all: PropTypes.array.isRequired,
  movieGenres: PropTypes.object.isRequired
};

export default DisplayMovies;
