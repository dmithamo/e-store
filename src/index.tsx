import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faArrowRight,
  faEye,
  faEyeSlash,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './common/store';

library.add(
  fab,
  faUserCircle,
  faArrowRight,
  faArrowLeft,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faEye,
  faEyeSlash,
  faShoppingCart,
);

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={reduxStore.store}>
        <PersistGate persistor={reduxStore.persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

render();
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('./App', render);
}
