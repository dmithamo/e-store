import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../features/auth/_authState';

const rootReducer = combineReducers({ auth });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
