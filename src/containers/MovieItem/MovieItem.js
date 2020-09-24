import React, { Component } from 'react';
import { Typography, Card, Rate } from 'antd';
import { format } from 'date-fns';
import { FrownTwoTone } from '@ant-design/icons';
import './MovieItem.css';

const { Text, Title } = Typography;

class MovieItem extends Component {
  render() {
    const {
      poster, title, date, genresList, genreIds, overview,
      rateMovie, filmId, guestId, voteAverage, rating,
    } = this.props;

    const genres = genreIds.map((genresFilm) => {
      const [currentGenre] = genresList.filter((item) => (
        item.id === genresFilm));
      return (<Text code key={currentGenre.id}>{currentGenre.name}</Text>);
    });

    let image = <div className='noImage'>
                  <span>No Image</span>
                  <FrownTwoTone/>
                </div>;

    if (poster) {
      image = <img src={`http://image.tmdb.org/t/p/w185${poster}`} alt='poster'/>;
    }
    let styleColor = null;
    if (voteAverage >= 7) {
      styleColor = '#66e900';
    } else if (voteAverage >= 5) {
      styleColor = '#e9d100';
    } else if (voteAverage >= 3) {
      styleColor = '#e97e00';
    } else {
      styleColor = '#e90000';
    }
    const releaseDate = date ? format(new Date(date), 'MMMM d, yyyy') : null;
    return (

      <Card>
        <div className='poster'>
          {image}
        </div>
        <div className='description'>
          <div className='title'>
            <Title level={4}>{title}</Title>
          </div>
          <div className='vote-average' style={{ borderColor: styleColor }}>
            <span>{voteAverage}</span>
          </div>
          <div className='date'>
            <Text type="secondary">{releaseDate}</Text>
          </div>
          <div className="genres">
            {genres}
          </div>
          <div className="overview">
            <Text strong>{overview}</Text>
          </div>
          <div className="rate">
            <Rate allowHalf count='10' defaultValue={rating} style={{ fontSize: 14 }} onChange={(num) => {
              const body = {
                value: num,
              };
              rateMovie(filmId, guestId, body);
            }}/>
          </div>
        </div>
      </Card>
    );
  }
}

export default MovieItem;
