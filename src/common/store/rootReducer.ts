import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../features/auth/utils/stateMgmt';
import shopFront from '../../features/shop-front/utils/stateMgmt';
import admin from '../../features/admin/utils/stateMgmt';

const rootReducer = combineReducers({ auth, shopFront, admin });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
