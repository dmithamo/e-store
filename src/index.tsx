import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import {
  faCheckCircle,
  faCircle,
  faTimesCircle,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faArrowRight,
  faBackward,
  faCalendarAlt,
  faCartArrowDown,
  faChartLine,
  faCheckCircle as filledCheckCircle,
  faDotCircle,
  faEllipsisH,
  faEllipsisV,
  faEnvelopeOpen,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faFastBackward,
  faFastForward,
  faForward,
  faMinusCircle,
  faMobileAlt,
  faPlusCircle,
  faShoppingCart,
  faSignOutAlt,
  faUserAlt,
  faUserEdit,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './common/store';
import './index.css';

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
  faMinusCircle,
);

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <StrictMode>
      <Provider store={reduxStore.store}>
        <PersistGate persistor={reduxStore.persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>,
    document.getElementById('root'),
  );
};

render();
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('./App', render);
}
