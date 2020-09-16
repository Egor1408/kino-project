import React from 'react';
import { List, Empty } from 'antd';
import MovieItem from '../movie-item';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import './search-movie-list.css';
import 'antd/dist/antd.css';

const SearchMovieList = (props) => {
  const {
    searchMovies, genres, loadMovieList, loadGenres, rateMovie, guestSessionId, error, searchTerm,
  } = props;
  const data = searchMovies.map((film) => ({
    id: film.id,
    poster: film.poster_path,
    title: film.original_title,
    overview: film.overview,
    date: film.release_date,
    genreIds: film.genre_ids,
    voteAverage: film.vote_average,
  }));

  const filmData = <List
                  grid={{ gutter: 20, column: 2 }}
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <MovieItem key={item.id}
                        voteAverage={item.voteAverage}
                        poster={item.poster}
                        title={item.title}
                        date={item.date}
                        overview={item.overview}
                        genreIds={item.genreIds}
                        id={item.id}
                        genresList={genres}
                        guestSessionId={guestSessionId}
                        rateMovie={rateMovie}
                        />
                    </List.Item>
                  )}
                  />;

  const searchEmpty = !searchTerm ? <Empty description='Введите название фильма'/> : null;
  const hasData = loadMovieList && loadGenres && !error;
  const content = hasData ? filmData : null;
  const spinner = loadMovieList || error || searchEmpty ? null : <Spinner />;
  const errorMessage = error ? <ErrorIndicator /> : null;
  return (
    <div className='movie-list'>
      {searchEmpty}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default SearchMovieList;