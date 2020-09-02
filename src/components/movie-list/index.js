import React from 'react';
import { List } from 'antd';

import MovieItem from './movie-item';
import './movie-list.css';
import 'antd/dist/antd.css';

const MovieList = (props) => {
  const { movies, genres } = props;
  const data = movies.map((film) => ({
    id: film.id,
    poster: film.poster_path,
    title: film.original_title,
    overview: film.overview,
    date: film.release_date,
    genreIds: film.genre_ids,
    voteAverage: film.vote_average,
  }));
  return (
    <div className='card-list'>
      <List
      grid={{ gutter: 20, column: 2 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <MovieItem key= {item.id}
            poster={item.poster}
            title={item.title}
            date={item.date}
            overview={item.overview}
            genreIds={item.genreIds}
            voteAverage={item.voteAverage}
            genresList={genres}/>
        </List.Item>
      )}
      />
    </div>

  );
};

export default MovieList;