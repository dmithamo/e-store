import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from './rootReducer';

const encryptor = createEncryptor({
  secretKey: process.env.REACT_APP_SECRET_KEY || 'its a see key ret',
  onError: (err: any) => {
    // eslint-disable-next-line no-console
    console.log('REDUX_PERSIST_ERR:', err);
  },
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export default { store, persistor };
