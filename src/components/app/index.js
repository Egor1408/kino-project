import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../services/api-service';
import { GenresProvider } from '../context';
import Main from '../main';
import { debounce } from '../../../node_modules/lodash';
import 'antd/dist/antd.css';
import './app.css';

export default class App extends Component {
  static propTypes = {
    genres: PropTypes.array,
    searchMovies: PropTypes.array,
    ratedMovies: PropTypes.array,

    currentPage: PropTypes.string,
    currentTab: PropTypes.string,
    searchTerm: PropTypes.string,

    totalSearchResults: PropTypes.number,
    totalRatedResults: PropTypes.number,

    loadGenres: PropTypes.bool,
    loadMovieList: PropTypes.bool,
    loadRatedList: PropTypes.bool,
    ratedListIsEmpty: PropTypes.bool,
    error: PropTypes.bool,
  }

  state = {
    guestSessionId: null,
    genres: [],
    searchMovies: [],
    ratedMovies: [],
    searchTerm: '',
    currentPage: '1',
    currentTab: '1',
    totalSearchResults: 0,
    totalRatedResults: 0,
    ratedListIsEmpty: true,
    loadGenres: false,
    loadMovieList: false,
    loadRatedList: false,
    error: false,
  };

  apiService = new ApiService();

  componentDidMount() {
    this.genres();
    this.guestSession();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage || this.state.searchTerm !== prevState.searchTerm) {
      this.searchList(this.state.searchTerm, this.state.currentPage);
    }
  }

  changeTab = (tab) => {
    this.setState({
      currentTab: tab,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loadMovieList: false,
    });
  }

  guestSession = () => {
    this.apiService
      .getGuestId()
      .then((session) => {
        this.setState({
          guestSessionId: session.guest_session_id,
        });
      })
      .catch(this.onError);
  }

  genres = () => {
    this.apiService
      .getGenresList()
      .then((list) => {
        this.setState({
          genres: [...list.genres],
          loadGenres: true,
        });
      })
      .catch(this.onError);
  }

  searchList = (searchTerm, pageNumber) => {
    this.apiService
      .getSearchList(searchTerm, pageNumber)
      .then((list) => {
        this.setState({
          searchMovies: [...list.results],
          totalSearchResults: list.total_results,
          loadMovieList: true,
        });
      })
      .catch(this.onError);
  }

  ratedList = (guestId) => {
    this.apiService
      .getRatedList(guestId)
      .then((list) => {
        // console.log(list);
        this.setState({
          ratedMovies: [...list.results],
          totalRatedResults: list.total_results,
          loadRatedList: true,
        });
      })
      // .then(console.log(this.state.ratedMovies))
      .catch(this.onError);
  };

  rateMovie = (movieId, guestId, requestBody) => {
    this.apiService
      .requestRateMovie(movieId, guestId, requestBody)
      .catch(this.onError);
  }

  changeSearch = debounce((e) => {
    this.setState({
      searchTerm: e,
      currentPage: 1,
    });
  }, 1500);

  nextPage = (newPage) => {
    this.setState({
      currentPage: newPage,
    });
  }

  render() {
    const {
      guestSessionId, searchMovies, ratedMovies, searchTerm, genres, currentTab,
      loadGenres, loadMovieList, loadRatedList, totalSearchResults, totalRatedResults, error,
    } = this.state;
    return (
      <GenresProvider value={this.apiService} >
        <div className="container">
          <Main
            changeSearch = {this.changeSearch}
            rateMovie = {this.rateMovie}
            ratedList = {this.ratedList}
            nextPage = {this.nextPage}
            changeTab = {this.changeTab}
            guestSessionId={guestSessionId}
            searchTerm={searchTerm}
            error={error}
            searchMovies={searchMovies}
            ratedMovies={ratedMovies}
            genres={genres}
            loadGenres={loadGenres}
            loadMovieList={loadMovieList}
            loadRatedList={loadRatedList}
            totalRatedResults={totalRatedResults}
            totalSearchResults = {totalSearchResults}
            currentTab={currentTab}
          />
        </div>
      </GenresProvider>
    );
  }
}
