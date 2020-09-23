import React from 'react';
import { Tabs, Input } from 'antd';
import SearchMovieList from '../../containers/SearchMovieList/SearchMovieList';
import RatedMovieList from '../../containers/RatedMovieList/RatedMovieList';
import './TabPanel.css';

const { TabPane } = Tabs;
const { Search } = Input;

const TabPanel = (props) => {
  const {
    rateMovie, guestId, onRateClick, genres, loadGenres, searchTerm, changeSearch,
  } = props;
  return (
    <div className='TabPanel'>
      <Tabs className="tabs" defaultActiveKey="1">
        <TabPane tab="Search" key="1">
          <Search
            className='search'
            placeholder='Search movie'
            onChange={(e) => (changeSearch(e.target.value))}
          />
          <SearchMovieList
            rateMovie={rateMovie}
            searchTerm={searchTerm}
            guestId={guestId}
            onRateClick={onRateClick}
            genres={genres}
            loadGenres={loadGenres}
          />
        </TabPane>
        <TabPane tab="Rated" key="2" >
          <RatedMovieList
            rateMovie={rateMovie}
            guestId={guestId}
            onRateClick={onRateClick}
            genres={genres}
            loadGenres={loadGenres}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabPanel;