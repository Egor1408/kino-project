import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Result } from 'antd';
import TabPanel from '../../components/TabPanel/TabPanel';
import ApiService from '../../services/api-service';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { GenresProvider } from '../../Context/Context';
import { debounce } from '../../../node_modules/lodash';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  static propTypes = {
    genres: PropTypes.array,
    searchTerm: PropTypes.string,
    guestSessionId: PropTypes.number,
    onRateClick: PropTypes.number,
    totalRatedResults: PropTypes.number,
    activeTab: PropTypes.number,
    loadGenres: PropTypes.bool,
    hasError: PropTypes.bool,
  }

  state = {
    genres: [],
    loadGenres: false,
    guestSessionId: null,
    onRateClick: 0,
    activeTab: 1,
    searchTerm: '',
    hasError: false,
  }

  apiService = new ApiService();

  componentDidMount() {
    this.guestSession();
    this.genres();
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  changeSearch = debounce((e) => {
    this.setState({
      searchTerm: e,
      currentPage: 1,
    });
  }, 1500);

  changeTab = (tab) => {
    this.setState({
      activeTab: tab,
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

  onError = () => {
    this.setState({
      hasError: true,
    });
  }

  rateMovie = (movieId, guestId, requestBody) => {
    this.apiService
      .requestRateMovie(movieId, guestId, requestBody)
      // eslint-disable-next-line no-return-assign
      .then(this.setState((prevState) => ({ onRateClick: prevState.onRateClick += 1 })))
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
      <GenresProvider value={this.state.genres}>
        <ErrorBoundary>
          <div className='wrapper'>
            <TabPanel
              rateMovie={this.rateMovie}
              guestId={this.state.guestSessionId}
              onRateClick={this.state.onRateClick}
              genres={this.state.genres}
              loadGenres={this.state.loadGenres}
              changeSearch={this.changeSearch}
              searchTerm={this.state.searchTerm}
              changeTab={this.changeTab}
              activeTab={this.state.activeTab}
              inputRef={this.inputRef}
            />
          </div>
        </ErrorBoundary>
      </GenresProvider>
    );
  }
}

export default App;