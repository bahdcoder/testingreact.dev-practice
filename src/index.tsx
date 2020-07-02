import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { FiltersWrapper } from './components/FiltersWrapper';

ReactDOM.render(
  <FiltersWrapper>
    <App />
  </FiltersWrapper>,
  document.getElementById('root'),
);
