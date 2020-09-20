import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../features/auth/utils/stateMgmt';

const rootReducer = combineReducers({ auth });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
