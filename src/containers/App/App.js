import React, { Component } from 'react';
import TabPanel from '../../components/TabPanel/TabPanel';
import ApiService from '../../services/api-service';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { GenresProvider } from '../../Context/Context';
import { debounce } from '../../../node_modules/lodash';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  state = {
    genres: [],
    loadGenres: false,
    guestSessionId: null,
    onRateClick: 0,
    searchTerm: '',
    currentRating: null,
  }

  apiService = new ApiService();

  componentDidMount() {
    this.guestSession();
    this.genres();
  }

  changeSearch = debounce((e) => {
    this.setState({
      searchTerm: e,
      currentPage: 1,
    });
  }, 1500);

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

  rateMovie = (movieId, guestId, requestBody) => {
    this.apiService
      .requestRateMovie(movieId, guestId, requestBody)
      // eslint-disable-next-line no-return-assign
      .then(this.setState((prevState) => ({ onRateClick: prevState.onRateClick += 1 })))
      .catch(this.onError);
  }

  render() {
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
            />
          </div>
        </ErrorBoundary>
      </GenresProvider>
    );
  }
}

export default App;