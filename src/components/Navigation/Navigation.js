import React from 'react';
import { Pagination } from 'antd';
import './Navigation.css';

const Navigation = (props) => {
  const {
    totalMovieResults, nextPage, loadMovieList,
  } = props;

  if (loadMovieList && totalMovieResults > 20) {
    return (
      <Pagination
        total={totalMovieResults}
        pageSize='20'
        onChange={(page) => { nextPage(page); }}
      />
    );
  }
  return null;
};
export default Navigation;