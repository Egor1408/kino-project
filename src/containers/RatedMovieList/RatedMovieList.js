/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { List, Empty } from 'antd';
import MovieItem from '../MovieItem/MovieItem';
import Navigation from '../../components/Navigation/Navigation';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import ApiService from '../../services/api-service';
import Spinner from '../../components/Spinner/Spinner';
import 'antd/dist/antd.css';
import './RatedMovieList.css';

class RatedMovieList extends Component {
  state = {
    ratedMovies: [],
    currentPage: '1',
    loadMovieList: false,
    totalMovieResults: 0,
  };

  apiService = new ApiService();

  componentDidMount() {
    this.ratedList(this.props.guestId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onRateClick !== prevProps.onRateClick) {
      this.ratedList(this.props.guestId);
    }
  }

  ratedList = (guestId) => {
    this.apiService
      .getRatedList(guestId)
      .then((list) => {
        this.setState({
          ratedMovies: [...list.results],
          totalMovieResults: list.total_results,
          loadMovieList: true,
        });
      })
      .catch(this.onError);
  };

  render() {
    const {
      ratedMovies, loadMovieList,
    } = this.state;
    const data = ratedMovies.map((film) => ({
      id: film.id,
      poster: film.poster_path,
      rating: film.rating,
      title: film.original_title,
      overview: film.overview,
      date: film.release_date,
      genreIds: film.genre_ids,
      voteAverage: film.vote_average,
    }));

    if (this.state.totalMovieResults === 0) {
      return <Empty description="Вы еще не оценили ни одного фильма"/>;
    }
    if (loadMovieList && this.props.loadGenres) {
      return (
        <React.Fragment>
          <div className='MovieList'>
            <List
            grid={{ gutter: 20, column: 2 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <ErrorBoundary key={item.id}>
                  <MovieItem
                    filmId={item.id}
                    poster={item.poster}
                    title={item.title}
                    date={item.date}
                    overview={item.overview}
                    genreIds={item.genreIds}
                    voteAverage={item.voteAverage}
                    genresList={this.props.genres}
                    rating={item.rating}
                    rateMovie={this.props.rateMovie}
                    guestId={this.props.guestId}
                  />
                </ErrorBoundary>
              </List.Item>
            )}
            />
          </div>
          <Navigation
            totalMovieResults={this.state.totalMovieResults}
            currentPage={this.state.currentPage}
            loadMovieList={this.state.loadMovieList}
            nextPage={this.nextPage}
          />
        </React.Fragment>
      );
    }
    return (<Spinner />);
  }
}

export default RatedMovieList;