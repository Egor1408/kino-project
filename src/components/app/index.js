import React, { Component } from 'react';
import ApiService from '../../services/api-service';

import Header from '../header';
import Footer from '../footer';
import MovieList from '../movie-list';
import Spinner from '../spinner';
import 'antd/dist/antd.css';
import './app.css';

export default class App extends Component {
  state = {
    genres: [],
    movies: [],
    searchTerm: 'return',
    totalResults: 0,
    loadGenres: false,
    loadMovieList: false,
  };

  componentDidMount() {
    this.getLists(this.state.searchTerm, this.state.currentPage);
    this.getGenres();
  }

  apiService = new ApiService();

  // componentDidMount
  getGenres() {
    this.apiService
      .getGenre()
      .then((list) => {
        this.setState({
          genres: [...list.genres],
          loadGenres: true,
        });
      })
      .catch(this.onError);
  }

  // componentDidMount
  getLists(searchTerm, pageNumber) {
    this.apiService
      .getList(`${searchTerm}&page=${pageNumber}`)
      .then((list) => {
        this.setState({
          movies: [...list.results],
          totalResults: list.total_results,
          loadMovieList: true,
        });
      })
      .catch(this.onError);
  }

  onError = (err) => {

  };

  // ComponentDidUpdate()
  nextPage = async (newPage) => {
    await this.setState({
      currentPage: newPage,
    });
    await this.getLists(this.state.currentPage);
  }

  // ComponentDidUpdate()
  changeSearch = async (e) => {
    await this.setState({
      searchTerm: e.target.value,
      currentPage: 1,
    });
    await this.getLists(this.state.searchTerm, this.state.currentPage);
  }

  render() {
    const {
      movies, genres, loadGenres, loadMovieList,
    } = this.state;
    let movieList = null;
    let footer = null;

    if (loadGenres && loadMovieList) {
      movieList = <MovieList movies = { movies } genres = { genres } />;
    } else movieList = <Spinner />;

    if (loadGenres && loadMovieList && this.state.totalResults > 20) {
      footer = <Footer
                  nextPage = {this.nextPage}
                  currentPage={this.state.currentPage}
                  total = {this.state.totalResults}
                />;
    }

    return (
      <div className="container">
        <Header changeSearch = {this.changeSearch}/>
        { movieList }
        { footer }
      </div>
    );
  }
}
