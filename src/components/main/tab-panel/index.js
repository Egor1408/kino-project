import React from 'react';
import { Tabs, Input } from 'antd';
import SearchMovieList from '../search-movie-list';
import RatedMovieList from '../rated-movie-list';
import Navigation from '../navigation';
import './tab-panel.css';

const { TabPane } = Tabs;
const { Search } = Input;

const TabPanel = (props) => (
    <div className='tab-panel'>
      <Tabs className="tabs" defaultActiveKey="1" onChange={(e) => {
        props.changeTab(e);
      }}>
        <TabPane tab="Search" key="1">
          <Search
            className='search'
            placeholder='Search movie'
            onChange={(e) => (props.changeSearch(e.target.value))}
          />
          <SearchMovieList { ...props }/>
        </TabPane>
        <TabPane tab="Rated" key="2" >
          <RatedMovieList { ...props}/>
        </TabPane>
      </Tabs>
      <Navigation {...props} />
    </div>
);

export default TabPanel;