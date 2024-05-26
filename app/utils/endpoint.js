export const GET_GENRE = 'genre/movie/list';
export const GET_MOVIE = 'discover/movie';
import http from '../http';
export const fetchGenre = async () => {
  return await http.get(GET_GENRE);
};
export const fetchMovie = async params => {
  try {
    const response = await http.get(GET_MOVIE, {params});
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};
