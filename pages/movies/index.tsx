import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MoviesResource from '../../lib/movies';
import type { IMovie } from '../../interfaces';
import Wrapper, { Movie } from '../../components/MoviesPage/MoviesPage.styles';

type Props = { movies: IMovie[] };

const Movies = ({ movies }: Props) => {
  const elements = movies.map(({ id, title, poster_path, release_date }) => (
    <Link href={`/movies/${id}`} key={id}>
      <Movie>
        <Image src={`https://image.tmdb.org/t/p/w300/${poster_path}`} width={300} height={400} />
        <p>{title}</p>
        <p>{release_date.slice(0, 4)}</p>
      </Movie>
    </Link>
  ));

  return <Wrapper>{elements}</Wrapper>;
};

export default Movies;

export const getStaticProps = async () => {
  const movies = await MoviesResource.getPopularMovies();

  return { props: { movies } };
};
