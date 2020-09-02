import React, { Component } from 'react';
import { Typography, Card, Rate } from 'antd';
import { format } from 'date-fns';
import './movie-item.css';
import Spinner from '../../spinner';

const { Text, Title } = Typography;

class MovieItem extends Component {
  render() {
    const {
      poster, title, date, genresList, genreIds, overview, voteAverage,
    } = this.props;

    const genres = genreIds.map((genresFilm) => {
      const [currentGenre] = genresList.filter((item) => (
        item.id === genresFilm));
      return (<Text code key={currentGenre.id}>{currentGenre.name}</Text>);
    });
    const average = Math.round(voteAverage);

    return (

      <Card style={{
        width: 451,
        height: 279,
      }}>
        <div className='poster'>
          { poster ? <img src={`http://image.tmdb.org/t/p/w185${poster}`} alt='poster'/> : <Spinner/>}
        </div>
        <div className='description'>
          <div className='title'>
            <Title level={4}>{title}</Title>
          </div>
          <div className='date'>
            <Text type="secondary">{format(new Date(date), 'MMMM d, yyyy')}</Text>
          </div>
          <div className="genres">
            {genres}
          </div>
          <div className="overview">
            <Text strong>{overview}</Text>
          </div>
          <div className="rate">
            <Rate allowHalf defaultValue={average} count='10' style={{ fontSize: 14 }}/>
          </div>
        </div>
      </Card>
    );
  }
}

export default MovieItem;
