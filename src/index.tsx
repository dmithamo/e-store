import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

library.add(
  fab,
  faUserCircle,
  faArrowRight,
  faArrowLeft,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
