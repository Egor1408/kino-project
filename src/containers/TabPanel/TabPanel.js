import React, { Component } from 'react';
import { Tabs, Input } from 'antd';
import MoviesList from '../MoviesList/MoviesList';
import './TabPanel.css';

const { TabPane } = Tabs;
const { Search } = Input;

export default class TabPanel extends Component {
  componentDidMount() {
    this.inputRef.focus();
  }

  render() {
    const {
      searchTerm, searchMoviesList, loadSearchList, totalSearchResults, currentSearchPage,

      ratedMoviesList, currentRatedPage, loadRatedList, totalRatedResults,

      rateMovie, column, nextPage,
      activeTab, changeSearchInput,

    } = this.props;
    return (
    <div className='TabPanel'>
      <Tabs className="tabs" defaultActiveKey="1" onChange={(e) => { this.props.changeTab(e); }}>
        <TabPane tab="Search" key="1">
          <Search
            // eslint-disable-next-line no-return-assign
            ref={(inputRef) => this.inputRef = inputRef}
            className='search'
            placeholder='Search movie'
            onChange={(e) => (changeSearchInput(e.target.value))}
          />
          <MoviesList
            activeTab={activeTab}
            column={column}
            currentPage={currentSearchPage}
            searchTerm={searchTerm}
            loadMovieList={loadSearchList}
            totalResults={totalSearchResults}
            moviesList={searchMoviesList}
            rateMovie={rateMovie}
            nextPage={nextPage}
          />
        </TabPane>
        <TabPane tab="Rated" key="2" >
          <MoviesList
            activeTab={activeTab}
            column={column}
            moviesList={ratedMoviesList}
            currentPage={currentRatedPage}
            loadMovieList={loadRatedList}
            totalResults={totalRatedResults}

            rateMovie={rateMovie}
            nextPage={nextPage}
          />
        </TabPane>
      </Tabs>
    </div>
    );
  }
}
