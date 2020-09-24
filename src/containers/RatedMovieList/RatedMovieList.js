/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import PropTypes, { number } from 'prop-types';
import { List, Empty, Result } from 'antd';
import MovieItem from '../MovieItem/MovieItem';
import Navigation from '../../components/Navigation/Navigation';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import ApiService from '../../services/api-service';
import Spinner from '../../components/Spinner/Spinner';
import 'antd/dist/antd.css';
import './RatedMovieList.css';

class RatedMovieList extends Component {
  static propTypes = {
    ratedMovies: PropTypes.array,
    loadMovieList: PropTypes.bool,
    totalMovieResults: PropTypes.number,
    hasError: PropTypes.bool,
    currentPage: PropTypes.number,
    col: PropTypes.number,
  }

  state = {
    ratedMovies: [],
    currentPage: '1',
    loadMovieList: false,
    totalMovieResults: 0,
    col: 2,
    hasError: false,
  };

  apiService = new ApiService();

  componentDidMount() {
    this.checkWidth();
    this.ratedList(this.props.guestId);
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeTab !== prevProps.activeTab
      || this.props.onRateClick !== prevProps.onRateClick) {
      this.ratedList(this.props.guestId);
    }
  }

  checkWidth = () => {
    if (document.documentElement.clientWidth < 800) {
      this.setState({
        col: 1,
      });
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

  onError = () => {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const {
      ratedMovies, loadMovieList, totalMovieResults, hasError, currentPage, col,
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

    if (hasError) {
      return <Result
              status="warning"
              title="There are some problems with your internet."
            />;
    }
    if (totalMovieResults === 0) {
      return <Empty description="Вы еще не оценили ни одного фильма"/>;
    }
    if (loadMovieList && this.props.loadGenres) {
      return (
        <React.Fragment>
          <div className='MovieList'>
            <List
            grid={{ gutter: 20, column: col }}
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
            totalMovieResults={totalMovieResults}
            currentPage={currentPage}
            loadMovieList={loadMovieList}
            nextPage={this.nextPage}
          />
        </React.Fragment>
      );
    }
    return (<Spinner />);
  }
}

export default RatedMovieList;