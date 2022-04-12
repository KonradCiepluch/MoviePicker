import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import MoviesResource from '../../lib/movies';
import AuthApi from '../../lib/auth';
import type { IMovie } from '../../interfaces';
import MovieWrapper, { Hearth } from '../../components/MovieDetails/MovieDetails.styles';

type Props = { movie: IMovie; favourite: boolean; user: null | { sessionId: string; userId: number } };

const MovieDetails = ({ movie: { id, title, overview, release_date, vote_average, vote_count, poster_path }, favourite, user }: Props) => {
  const [isFavourite, setIsFavourite] = useState(favourite);

  const handleClick = () => {
    AuthApi.toggleFavouriteMovie({ id, favorite: !isFavourite, userId: user.userId, sessionId: user.sessionId });
    setIsFavourite((prevState) => !prevState);
  };

  return (
    <MovieWrapper>
      <h2>{title}</h2>
      <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} width={400} height={500} />
      <p>Released: {release_date}</p>
      <p>{overview}</p>
      <p>Rating: {vote_average}</p>
      <p>Total: {vote_count}</p>
      {user ? (
        <Hearth
          className={`${isFavourite ? 'fas' : 'far'} fa-heart`}
          isFavourite={isFavourite}
          onClick={handleClick}
          title={`${isFavourite ? 'Dislike this movie' : 'Like this movie'}`}
        />
      ) : null}
    </MovieWrapper>
  );
};

export default MovieDetails;

export const getServerSideProps: GetServerSideProps = async ({ params: { id }, req, res }) => {
  const movie = await MoviesResource.getMovieDetails(id);
  try {
    const { sessionId } = AuthApi.getUserFromCookies({ req, res });

    const { userId } = await AuthApi.getUserDetails(sessionId);

    const movies = await AuthApi.getFavouriteMovies(userId, sessionId);

    const isFavourite = movies.some(({ id: movieId }) => movieId === Number(id));

    return { props: { movie, user: { sessionId, userId }, favourite: isFavourite } };
  } catch (e) {
    return { props: { movie, favourite: false, user: null } };
  }
};
