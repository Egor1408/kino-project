import React from 'react';
import { Tabs, Input } from 'antd';
import './header.css';

const { TabPane } = Tabs;
const { Search } = Input;

const Header = (props) => (
  <header>
    <Tabs className="tabs" defaultActiveKey="1">
      <TabPane tab="Search" key="1">
        <Search
          className='search'
          placeholder='Search movie'
          onChange={props.changeSearch}
        />
      </TabPane>
      <TabPane tab="Rated" key="2">
        Rated
      </TabPane>
    </Tabs>
  </header>
);

export default Header;