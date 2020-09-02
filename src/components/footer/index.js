import React from 'react';
import { Pagination } from 'antd';
import './footer.css';

const Footer = (props) => {
  const {
    total, nextPage,
  } = props;

  return (
  <footer>
    <Pagination
      size="small"
      total={total}
      defaultPageSize='20'
      onChange={(page) => { nextPage(page); }}/>
  </footer>
  );
};

export default Footer;