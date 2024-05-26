export const GET_GENRE_ACTION = 'GET_GENRE_ACTION';
import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {fetchGenre, fetchMovie} from '../../utils/endpoint';
export const genreSlice = createSlice({
  name: 'genreList',
  initialState: {
    genreList: null,
    loading: false,
    movieList: [],
    filtered_movieList: [],
    primary_release_year: 2012,
    totalPages: 1,
    totalResuls: 1,
  },
  reducers: {
    saveGenre: (state, action) => {
      state.genreList = action.payload;
    },
    saveMovie: (state, action) => {
      let prevArr = state.movieList;
      prevArr.push(action.payload[0]);
      state.movieList = prevArr;
      state.filtered_movieList = prevArr;
      // console.log('===state.movieList ', JSON.stringify(prevArr));
    },
    saveTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    saveTotalResults: (state, action) => {
      state.totalResuls = action.payload;
    },
    updateReleaseYear: (state, action) => {
      state.primary_release_year = action.payload;
    },
    filterMovieListOnGenreId: (state, action) => {
      const genreIdToFilter = action.payload;
      const data = state.movieList;

      const filteredMovies = data.flatMap(entry =>
        entry.movies.filter(movie => movie.genre_ids.includes(genreIdToFilter)),
      );

      const moviesByYear = {};
      filteredMovies.forEach(movie => {
        if (movie.release_date) {
          const releaseYear = movie.release_date.split('-')[0];
          if (!moviesByYear[releaseYear]) {
            moviesByYear[releaseYear] = [];
          }
          moviesByYear[releaseYear].push(movie);
        }
      });

      const arrayOfObjects = Object.entries(moviesByYear).map(
        ([year, movies]) => ({
          year: parseInt(year),
          movies: movies,
        }),
      );
      state.filtered_movieList = arrayOfObjects;

      // console.log('====after filter state.filtered_movieList', arrayOfObjects);
    },
  },
});
export const getGenreList = () => async (dispatch: Dispatch) => {
  const res = await fetchGenre();
  if (res.status === 200) {
    dispatch(saveGenre(res.data.genres));
  } else {
    dispatch(saveGenre([]));
  }
};

export const getMovieList =
  (primary_release_year: Number) => async (dispatch: Dispatch) => {
    try {
      console.log('====primary_release_year', primary_release_year);
      dispatch(setLoading(true));
      const res = await fetchMovie({primary_release_year});
      if (res) {
        dispatch(saveTotalPages(res.data?.total_pages));
        dispatch(saveTotalResults(res.data?.total_results));

        const moviesByYear = {};
        res.results.forEach(movie => {
          const releaseYear = movie.release_date.split('-')[0];
          if (!moviesByYear[releaseYear]) {
            moviesByYear[releaseYear] = [];
          }
          moviesByYear[releaseYear].push(movie);
        });
        // console.log('=====moviesByYear', moviesByYear);

        const arrayOfObjects = Object.entries(moviesByYear).map(
          ([year, movies]) => ({
            year: parseInt(year),
            movies: movies,
          }),
        );

        dispatch(saveMovie(arrayOfObjects));
        if (primary_release_year)
          dispatch(updateReleaseYear(Number(primary_release_year) + 1));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log('====getMovieList error', error);
      dispatch(setLoading(false));
    }
  };

export const {
  saveGenre,
  saveMovie,
  saveTotalPages,
  updateReleaseYear,
  saveTotalResults,
  setLoading,
  filterMovieListOnGenreId,
} = genreSlice.actions;
export const homePageReducer = genreSlice.reducer;
