import React, { Component } from 'react';
import { List, Empty, Result } from 'antd';
import MovieItem from '../MovieItem/MovieItem';
import Navigation from '../../components/Navigation/Navigation';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import Spinner from '../../components/Spinner/Spinner';
import './MoviesList.css';
import 'antd/dist/antd.css';

export default class MoviesList extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const {
      moviesList, currentPage, loadMovieList, nextPage, column,
      hasError, totalResults, searchTerm, activeTab,
    } = this.props;
    // console.log(currentPage);
    const data = moviesList.map((film) => ({
      id: film.id,
      poster: film.poster,
      rating: film.rating,
      title: film.title,
      description: film.description,
      release: film.release,
      genres: film.genres,
      averageRating: film.averageRating,
    }));
    if (hasError) {
      return <Result
              status="warning"
              title="There are some problems with your internet."
            />;
    }
    if (!searchTerm && activeTab === '1') {
      return <Empty description='Введите название фильма'/>;
    }
    if (loadMovieList && totalResults !== 0) {
      return (

                  <React.Fragment>
                    <div className='movie-list'>
                      <List
                        grid={{ gutter: 20, column }}
                        dataSource={data}
                        renderItem={(item) => (
                          <List.Item>
                            <ErrorBoundary key= {item.id}>
                              <MovieItem
                                // hasError={this.state.hasError}
                                filmId={item.id}
                                poster={item.poster}
                                title={item.title}
                                release={item.release}
                                description={item.description}
                                genres={item.genres}
                                averageRating={item.averageRating}
                                rating={item.rating}
                                rateMovie={this.props.rateMovie}
                              />
                            </ErrorBoundary>
                          </List.Item>
                        )}
                      />
                    </div>
                    <Navigation
                      totalMovieResults={totalResults}
                      currentPage={currentPage}
                      loadMovieList={loadMovieList}
                      nextPage={nextPage}
                      activeTab={activeTab}
                    />
                  </React.Fragment>
      );
    }

    if (!totalResults && loadMovieList && activeTab === '1') {
      return <Empty description='Поиск не дал результатов'/>;
    }
    if (!totalResults && loadMovieList && activeTab === '2') {
      return <Empty description='Вы не оценили ни одного фильма'/>;
    }
    return <Spinner />;
  }
}
