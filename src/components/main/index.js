import React from 'react';

import './main.css';
import TabPanel from './tab-panel';

const Main = (props) => (
    <main>
      <TabPanel {...props}/>
    </main>
);
export default Main;