/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { List, Empty } from 'antd';
import MovieItem from '../MovieItem/MovieItem';
import Navigation from '../../components/Navigation/Navigation';
import ApiService from '../../services/api-service';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import Spinner from '../../components/Spinner/Spinner';
import { GenresConsumer } from '../../Context/Context';
import './SearchMovieList.css';
import 'antd/dist/antd.css';

class SearchMovieList extends Component {
  state = {
    searchMovies: [],
    currentPage: '1',
    totalMovieResults: 0,
    loadMovieList: false,
  };

  apiService = new ApiService();

  componentDidMount() {
    // this.searchList(this.props.searchTerm, this.state.currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage
      || (this.props.searchTerm !== prevProps.searchTerm && this.props.searchTerm !== '')
      || this.props.onRateClick !== prevProps.onRateClick) {
      this.searchList(this.props.searchTerm, this.state.currentPage);
    }
  }

  searchList = (searchTerm, pageNumber) => {
    this.apiService
      .getSearchList(searchTerm, pageNumber)
      .then((list) => {
        this.setState({
          searchMovies: [...list.results],
          totalMovieResults: list.total_results,
          loadMovieList: true,
        });
      })
      .catch(this.onError);
  }

  nextPage = (newPage) => {
    this.setState({
      currentPage: newPage,
    });
  }

  render() {
    const {
      searchMovies, loadMovieList,
    } = this.state;
    const data = searchMovies.map((film) => ({
      id: film.id,
      poster: film.poster_path,
      rating: film.rating,
      title: film.original_title,
      overview: film.overview,
      date: film.release_date,
      genreIds: film.genre_ids,
      voteAverage: film.vote_average,
    }));
    if (this.props.searchTerm
      && loadMovieList
      && this.props.loadGenres
      && this.state.totalMovieResults !== 0) {
      return (
        <GenresConsumer>
          {
            (genres) => (
                <React.Fragment>
                  <div className='movie-list'>
                    <List
                      grid={{ gutter: 20, column: 2 }}
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <ErrorBoundary key= {item.id}>
                            <MovieItem
                              filmId={item.id}
                              poster={item.poster}
                              title={item.title}
                              date={item.date}
                              overview={item.overview}
                              genreIds={item.genreIds}
                              voteAverage={item.voteAverage}
                              genresList={genres}
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
            )
          }
        </GenresConsumer>
      );
    }
    if (!this.props.searchTerm) {
      return <Empty description='Введите название фильма'/>;
    }
    if (!this.state.totalMovieResults && loadMovieList) {
      return <Empty description='Поиск не дал результатов'/>;
    }
    return (<Spinner />);
  }
}

export default SearchMovieList;