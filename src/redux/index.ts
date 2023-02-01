import { combineReducers } from '@reduxjs/toolkit';
import { reducer as ApplicationReducer } from './slices/applicationSlice';
import { reducer as persistedUserReducer } from './slices/persistedUserSlice';
import { reducer as userReducer } from './slices/userSlice';
import orderReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  persistedUser: persistedUserReducer,

  user: userReducer,
  application: ApplicationReducer,
  order: orderReducer,
});
