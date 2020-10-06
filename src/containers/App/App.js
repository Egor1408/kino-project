import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Result } from 'antd';
import TabPanel from '../TabPanel/TabPanel';
import ApiService from '../../services/ApiService';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { debounce } from '../../../node_modules/lodash';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  static propTypes = {
    searchMovies: PropTypes.array,
    currentPageSearch: PropTypes.number,
    totalSearchResults: PropTypes.number,
    loadSearchList: PropTypes.bool,
    searchTerm: PropTypes.string,
    totalRatedResults: PropTypes.number,
    activeTab: PropTypes.number,
    hasError: PropTypes.bool,
  }

  state = {

    searchTerm: '',
    searchMoviesList: [],
    currentSearchPage: 1,
    loadSearchList: false,
    totalSearchResults: 0,

    ratedMoviesList: [],
    currentRatedPage: 1,
    loadRatedList: false,
    totalRatedResults: 0,

    activeTab: '1',
    column: 2,
    hasError: false,

  }

  apiService = new ApiService();

  componentDidMount() {
    this.checkWidth();
    this.apiService.getGenres();
    if (!sessionStorage.getItem('session')) this.apiService.initguestSession();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.state.searchTerm !== prevState.searchTerm && this.state.searchTerm !== '')
      || (this.state.activeTab !== prevState.activeTab && this.state.searchTerm !== '')) {
      this.setState({
        loadSearchList: false,
      });
      this.searchList(this.state.searchTerm, this.state.currentSearchPage);
    }

    if ((this.state.currentSearchPage !== prevState.currentSearchPage)) {
      this.setState({
        loadSearchList: false,
      });
      this.searchList(this.state.searchTerm, this.state.currentSearchPage);
    }

    if (this.state.activeTab !== prevState.activeTab) {
      this.setState({
        loadRatedList: false,
      });
      this.ratedList(this.state.currentRatedPage);
    }
    if ((this.state.currentRatedPage !== prevState.currentRatedPage)) {
      this.setState({
        loadRatedList: false,
      });
      this.ratedList(this.state.currentRatedPage);
    }
  }

  ratedList = (pageNumber) => {
    this.apiService
      .getRated(pageNumber)
      .then((list) => {
        const result = Object.values(list.movies).map((i) => (i));
        this.setState({
          ratedMoviesList: result,
          totalRatedResults: list.totalResults,
          loadRatedList: true,
        });
      })
      .catch(this.onError);
  };

  searchList = (searchTerm, pageNumber) => {
    this.apiService
      .searchMovies(searchTerm, pageNumber)
      .then((list) => {
        this.setState({
          searchMoviesList: list.movies,
          totalSearchResults: list.totalResults,
          loadSearchList: true,
        });
      })
      .catch(this.onError);
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  checkWidth = () => {
    if (document.documentElement.clientWidth < 800) {
      this.setState({
        column: 1,
      });
    }
  }

  nextPage = (tab, newPage) => {
    const currentPage = tab === '1' ? 'currentSearchPage' : 'currentRatedPage';
    this.setState({
      [currentPage]: newPage,
    });
  }

  changeSearchInput = debounce((e) => {
    this.setState({
      searchTerm: e,
      currentSearchPage: 1,
    });
  }, 1500);

  changeTab = (tab) => {
    this.setState({
      activeTab: tab,
    });
  }

  onError = () => {
    this.setState({
      hasError: true,
    });
  }

  setRating = async (value, id) => {
    const key = (JSON.parse(sessionStorage.getItem('session'))).token;
    await this.movieApi.setRating(id, key, { value });
  };

  rateMovie = async (value, movieId) => {
    const key = (JSON.parse(sessionStorage.getItem('session'))).token;
    await this.apiService
      .setRating(movieId, key, { value })
      .catch(this.onError);
  }

  render() {
    if (this.state.hasError) {
      return <Result
            status="warning"
            title="There are some problems with your internet."
            />;
    }
    return (
        <ErrorBoundary>
          <div className='wrapper'>
            <TabPanel
              column = {this.state.column}

              searchTerm={this.state.searchTerm}
              searchMoviesList={this.state.searchMoviesList}
              loadSearchList={this.state.loadSearchList}
              currentSearchPage={this.state.currentSearchPage}
              totalSearchResults={this.state.totalSearchResults}

              ratedMoviesList={this.state.ratedMoviesList}
              currentRatedPage={this.state.currentRatedPage}
              loadRatedList={this.state.loadRatedList}
              totalRatedResults={this.state.totalRatedResults}

              rateMovie={this.rateMovie}
              nextPage={this.nextPage}
              changeSearchInput={this.changeSearchInput}
              changeTab={this.changeTab}
              activeTab={this.state.activeTab}
            />
          </div>
        </ErrorBoundary>
    );
  }
}

export default App;