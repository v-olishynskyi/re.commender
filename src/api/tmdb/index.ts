import axios from 'axios';

const apiKey = process.env.REACT_APP_THE_MOVIE_DB_API_KEY_V3;

export const tmdbBaseURL = 'https://api.themoviedb.org/3/';

const tmdbAxios = axios.create({
  baseURL: tmdbBaseURL,
  responseType: 'json',
});

export const tmdb_getPopularMovies = async ({
  page = 1,
}: {
  page?: number;
}) => {
  const response = await tmdbAxios.get(
    `movie/popular?api_key=${apiKey}&language=uk-UK&page=${page}`
  );

  return response.data;
};

export const tmdb_getUserLibraries = async ({
  page = 1,
  include_adult = false,
}: {
  page?: number;
  include_adult?: boolean;
}) => {
  const response = await tmdbAxios.get(
    `search/multi?api_key=${apiKey}&language=uk-UK&page=${page}&include_adult=${include_adult}`
  );

  return response.data;
};
