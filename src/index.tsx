import './index.css';
import './assets/fonts/Poppins-Black.ttf';
import './assets/fonts/Poppins-Regular.ttf';
import './assets/fonts/Poppins-Light.ttf';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import {
  faTimesCircle,
  faUserCircle,
  faCircle,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faArrowRight,
  faEye,
  faEyeSlash,
  faShoppingCart,
  faSignOutAlt,
  faUserEdit,
  faEnvelopeOpen,
  faMobileAlt,
  faCalendarAlt,
  faPlusCircle,
  faFastBackward,
  faBackward,
  faForward,
  faFastForward,
  faCheckCircle as filledCheckCircle,
  faMinusCircle,
  faDotCircle,
  faUserShield,
  faUserAlt,
  faEllipsisV,
  faEllipsisH,
  faExternalLinkAlt,
  faCartArrowDown,
  faChartLine,
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
  faTimesCircle,
  faSignOutAlt,
  faUserEdit,
  faEnvelopeOpen,
  faMobileAlt,
  faCalendarAlt,
  faCcVisa,
  faPlusCircle,
  faFastBackward,
  faBackward,
  faForward,
  faFastForward,
  faCheckCircle,
  faMinusCircle,
  faDotCircle,
  faUserShield,
  faUserAlt,
  faEllipsisV,
  faEllipsisH,
  faCircle,
  filledCheckCircle,
  faExternalLinkAlt,
  faCartArrowDown,
  faChartLine,
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
