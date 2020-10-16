import { combineReducers } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import auth from '../../features/auth/utils/stateMgmt';
import shopFront from '../../features/shop-front/utils/stateMgmt';
import admin from '../../features/admin/utils/stateMgmt';
import tableSelection from '../components/Table/utils/stateMgmt';

enableMapSet();
const rootReducer = combineReducers({ auth, shopFront, admin, tableSelection });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
