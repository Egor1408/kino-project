import React, { Component } from 'react';
import { Tabs, Input } from 'antd';
import SearchMovieList from '../../containers/SearchMovieList/SearchMovieList';
import RatedMovieList from '../../containers/RatedMovieList/RatedMovieList';
import './TabPanel.css';

const { TabPane } = Tabs;
const { Search } = Input;

class TabPanel extends Component {
  componentDidMount() {
    this.inputRef.focus();
  }

  render() {
    const {
      activeTab, rateMovie, guestId, onRateClick, genres, loadGenres, searchTerm, changeSearch,
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
            onChange={(e) => (changeSearch(e.target.value))}
          />
          <SearchMovieList
            rateMovie={rateMovie}
            searchTerm={searchTerm}
            guestId={guestId}
            onRateClick={onRateClick}
            genres={genres}
            loadGenres={loadGenres}
            activeTab={activeTab}
          />
        </TabPane>
        <TabPane tab="Rated" key="2" >
          <RatedMovieList
            rateMovie={rateMovie}
            guestId={guestId}
            onRateClick={onRateClick}
            genres={genres}
            loadGenres={loadGenres}
            activeTab={activeTab}
          />
        </TabPane>
      </Tabs>
    </div>
    );
  }
}

export default TabPanel;