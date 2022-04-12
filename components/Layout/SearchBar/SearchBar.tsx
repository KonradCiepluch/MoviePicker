import React, { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useOnClickOutside } from 'usehooks-ts';
import SearchBarWrapper, { FoundMoviesList } from './SearchBar.styles';
import MoviesResource from '../../../lib/movies';
import CustomLink from '../CustomLink/CustomLink';
import type { IMovie } from '../../../interfaces';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState<IMovie[]>([]);

  const listRef = useRef(null);

  useOnClickOutside(listRef, () => setMovies([]));

  const searchMovies = useCallback(
    debounce(async (searchPhrase: string) => {
      const items = await MoviesResource.getMoviesByQuery(searchPhrase);
      setMovies(items);
    }, 500),
    []
  );

  useEffect(() => {
    if (!value) return;
    searchMovies(value);
  }, [searchMovies, value]);

  return (
    <>
      <SearchBarWrapper>
        <label htmlFor="search">Search movies</label>
        <input type="text" placeholder="Movie name..." value={value} onChange={(e) => setValue(e.target.value)} />
      </SearchBarWrapper>
      {movies.length ? (
        <FoundMoviesList ref={listRef}>
          {movies.map(({ id, title, poster_path }) => (
            <CustomLink key={id} href={`/movies/${id}`} title={title} img={poster_path} />
          ))}
        </FoundMoviesList>
      ) : null}
    </>
  );
};

export default SearchBar;
