import React from 'react';
import { Pagination } from 'antd';
import './Navigation.css';

const Navigation = (props) => {
  const {
    totalMovieResults, nextPage, loadMovieList, activeTab, currentPage,
  } = props;
  if (loadMovieList && totalMovieResults > 20) {
    return (
      <Pagination
        current={currentPage}
        total={totalMovieResults}
        pageSize='20'
        onChange={(page) => { nextPage(activeTab, page); }}
      />
    );
  }
  return null;
};
export default Navigation;