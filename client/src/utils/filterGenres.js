// Filter genres
export default function(movies) {
  let result = {
    action: [],
    adventure: [],
    animation: [],
    comedy: [],
    crime: [],
    documentary: [],
    drama: [],
    family: [],
    fantasy: [],
    history: [],
    horror: [],
    music: [],
    mystery: [],
    romance: [],
    scienceFiction: [],
    tvMovie: [],
    thriller: [],
    war: [],
    western: []
  };
  if (movies.length === 0) {
    return result;
  }
  Array.from(movies).forEach(movie => {
    let genres;
    if (movie.genres) {
      genres = movie.genres.map(item => item.id);
    } else {
      genres = movie.genre_ids;
    }
    if (genres.indexOf(28) !== -1) {
      result.action.push(movie);
    }
    if (genres.indexOf(12) !== -1) {
      result.adventure.push(movie);
    }
    if (genres.indexOf(16) !== -1) {
      result.animation.push(movie);
    }
    if (genres.indexOf(35) !== -1) {
      result.comedy.push(movie);
    }
    if (genres.indexOf(80) !== -1) {
      result.crime.push(movie);
    }
    if (genres.indexOf(99) !== -1) {
      result.documentary.push(movie);
    }
    if (genres.indexOf(18) !== -1) {
      result.drama.push(movie);
    }
    if (genres.indexOf(10751) !== -1) {
      result.family.push(movie);
    }
    if (genres.indexOf(14) !== -1) {
      result.fantasy.push(movie);
    }
    if (genres.indexOf(36) !== -1) {
      result.history.push(movie);
    }
    if (genres.indexOf(27) !== -1) {
      result.horror.push(movie);
    }
    if (genres.indexOf(10402) !== -1) {
      result.music.push(movie);
    }
    if (genres.indexOf(9648) !== -1) {
      result.mystery.push(movie);
    }
    if (genres.indexOf(10749) !== -1) {
      result.romance.push(movie);
    }
    if (genres.indexOf(878) !== -1) {
      result.scienceFiction.push(movie);
    }
    if (genres.indexOf(10770) !== -1) {
      result.tvMovie.push(movie);
    }
    if (genres.indexOf(53) !== -1) {
      result.thriller.push(movie);
    }
    if (genres.indexOf(10752) !== -1) {
      result.war.push(movie);
    }
    if (genres.indexOf(37) !== -1) {
      result.western.push(movie);
    }
  });
  return result;
}
