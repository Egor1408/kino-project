import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, Rate } from 'antd';
import { format } from 'date-fns';
import { FrownTwoTone } from '@ant-design/icons';
import './MovieItem.css';

const { Text, Title } = Typography;

export default class MovieItem extends Component {
  static defaultProps = {
    rating: 0,
  }

  static defaultProps = {
    id: 0,
    averageRating: 0,
    poster: null,
    title: null,
    release: null,
    genres: [],
    description: 'Описание временно отсутствует',
    rating: 0,
  }

  static propTypes = {
    id: PropTypes.number,
    averageRating: PropTypes.number,
    poster: PropTypes.string,
    title: PropTypes.string,
    release: PropTypes.string,
    description: PropTypes.string,
    genres: PropTypes.array,
    rating: PropTypes.number,
  }

  render() {
    const {
      poster, title, release, genres, description,
      rateMovie, filmId, averageRating, rating,
    } = this.props;

    const genresList = genres.map((item, i) => (<Text code key={i}> {item}</Text>));
    let image = <div className='noImage'>
                  <span>No Image</span>
                  <FrownTwoTone/>
                </div>;

    if (poster) {
      image = <img src={`http://image.tmdb.org/t/p/w185${poster}`} alt='poster'/>;
    }
    let styleColor = null;
    if (averageRating >= 7) {
      styleColor = '#66e900';
    } else if (averageRating >= 5) {
      styleColor = '#e9d100';
    } else if (averageRating >= 3) {
      styleColor = '#e97e00';
    } else {
      styleColor = '#e90000';
    }
    const releaseDate = release ? format(new Date(release), 'MMMM d, yyyy') : null;
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
            <span>{averageRating}</span>
          </div>
          <div className='date'>
            <Text type="secondary">{releaseDate}</Text>
          </div>
          <div className="genres">
            {genresList}
          </div>
          <div className="overview">
            <Text strong>{description}</Text>
          </div>
          <div className="rate">
            <Rate allowHalf count='10' defaultValue={rating} style={{ fontSize: 14 }} onChange={(value) => {
              rateMovie(value, filmId);
            }}/>
          </div>
        </div>
      </Card>
    );
  }
}
