import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../features/auth/utils/stateMgmt';
import shopFront from '../../features/shop-front/utils/stateMgmt';

const rootReducer = combineReducers({ auth, shopFront });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
