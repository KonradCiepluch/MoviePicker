import type { IMovie } from '../interfaces';

const fetcher = async <T>(url: string, errorReturnValue: [] | {} = []) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error('Unable to get data');

    const data = await response.json();

    return (Array.isArray(errorReturnValue) ? data.results : data) as T;
  } catch (e) {
    console.error(e);
    return errorReturnValue as unknown as T;
  }
};

class MoviesResource {
  private static url = 'https://api.themoviedb.org/3';

  static getPopularMovies = () => fetcher<IMovie[]>(`${MoviesResource.url}/movie/popular?api_key=${process.env.apiKey}`);

  static getMoviesByQuery = (query: string) => fetcher<IMovie[]>(`${MoviesResource.url}/search/movie?api_key=${process.env.apiKey}&query=${query}`);

  static getMovieDetails = (movieId: string | string[]) => {
    const id = Array.isArray(movieId) ? movieId[0] : movieId;
    return fetcher<IMovie>(`${MoviesResource.url}/movie/${id}?api_key=${process.env.apiKey}`, {});
  };
}

export default MoviesResource;
