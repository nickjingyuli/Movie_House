import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Tab, Icon } from "semantic-ui-react";

const DisplayLikes = ({ all, movieGenres }) => {
  const panes = [
    {
      menuItem: <p>All</p>,
      render: () => (
        <Tab.Pane attached={false}>
          {all.map(item => (
            <p>{item.id} </p>
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: "Action",
      render: () =>
        movieGenres.action.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {movieGenres.action.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Adventure",
      render: () =>
        movieGenres.adventure.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {movieGenres.adventure.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Animation",
      render: () =>
        movieGenres.animation.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.animation.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Comedy",
      render: () =>
        movieGenres.comedy.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.comedy.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Crime",
      render: () =>
        movieGenres.crime.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.crime.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Documentary",
      render: () =>
        movieGenres.documentary.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.documentary.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Drama",
      render: () =>
        movieGenres.drama.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.drama.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Family",
      render: () =>
        movieGenres.family.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.family.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Fantasy",
      render: () =>
        movieGenres.fantasy.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.fantasy.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "History",
      render: () =>
        movieGenres.history.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.history.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Horror",
      render: () =>
        movieGenres.horror.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.horror.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Music",
      render: () =>
        movieGenres.music.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.music.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Mystery",
      render: () =>
        movieGenres.mystery.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.mystery.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Romance",
      render: () =>
        movieGenres.romance.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.romance.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Science Fiction",
      render: () =>
        movieGenres.scienceFiction.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.scienceFiction.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "TV Movie",
      render: () =>
        movieGenres.tvMovie.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.tvMovie.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Thriller",
      render: () =>
        movieGenres.thriller.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.thriller.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "War",
      render: () =>
        movieGenres.war.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.war.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    },
    {
      menuItem: "Western",
      render: () =>
        movieGenres.action.length === 0 ? (
          <Tab.Pane attached={false}>
            <p className="lead">No Movies</p>
          </Tab.Pane>
        ) : (
          <Tab.Pane attached={false}>
            {" "}
            {movieGenres.action.map(item => (
              <p>{item.id} </p>
            ))}
          </Tab.Pane>
        )
    }
  ];
  return (
    <Fragment>
      <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
    </Fragment>
  );
};

DisplayLikes.propTypes = {};

export default DisplayLikes;
