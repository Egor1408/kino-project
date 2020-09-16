import React from 'react';
import { Pagination } from 'antd';
import './pagination.css';

const Navigation = (props) => {
  const {
    totalSearchResults, totalRatedResults, nextPage, loadMovieList, currentTab,
  } = props;

  if (loadMovieList && totalSearchResults > 20 && currentTab === '1') {
    return (
      <Pagination
        total={totalSearchResults}
        pageSize='20'
        onChange={(page) => { nextPage(page); }}
      />
    );
  }
  return null;
};
export default Navigation;