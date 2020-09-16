import React from 'react';
import { List } from 'antd';
import MovieItem from '../movie-item';
import Spinner from '../../spinner';
import './rated-movie-list.css';
import 'antd/dist/antd.css';

const RatedMovieList = (props) => {
  const {
    ratedMovies, genres, loadRatedList, rateMovie, guestSessionId,
  } = props;
  const data = ratedMovies.map((film) => ({
    id: film.id,
    poster: film.poster_path,
    title: film.original_title,
    overview: film.overview,
    date: film.release_date,
    genreIds: film.genre_ids,
  }));

  const filmData = <List
                    grid={{ gutter: 20, column: 2 }}
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item>
                        <MovieItem key={item.id}
                          poster={item.poster}
                          title={item.title}
                          date={item.date}
                          overview={item.overview}
                          genreIds={item.genreIds}
                          id={item.id}
                          genresList={genres}
                          guestSessionId={guestSessionId}
                          RateMovie={rateMovie}
                          />
                      </List.Item>
                    )}
                    />;

  const spinner = !loadRatedList ? <Spinner /> : null;
  const content = loadRatedList ? filmData : null;
  return (
    <div className='rated-list'>
      {content}
      {spinner}
    </div>
  );
};

export default RatedMovieList;