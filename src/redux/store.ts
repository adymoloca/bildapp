import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from '.';
import { OrderState } from './slices/orderSlice';
import { ApplicationState } from './slices/applicationSlice';
import createSagaMiddleware from 'redux-saga';
import { applicationSaga } from './slices/applicationSlice/saga';
import { orderSaga } from './slices/orderSlice/saga';
import { persistedUserSaga } from './slices/persistedUserSlice/saga';
import { PersistedUserState } from './slices/persistedUserSlice';
import { UserState } from './slices/userSlice';
import { userSaga } from './slices/userSlice/saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  /**
 * Blacklist any state that will not be persisted
 */
  blacklist: [
    'order',
    'user',
  ],
};

export interface IRootState {
  order: OrderState;
  application: ApplicationState;
  user: UserState;
  persistedUser: PersistedUserState;
}

const sagaMiddleware = createSagaMiddleware();

const initializeStore = (rootReducer: any) => {
  const middleware: any = [sagaMiddleware];
  const enhancers = [];

  enhancers.push(applyMiddleware(...middleware, logger));

  // Redux persist
  const persistedReducer = persistReducer<IRootState>(persistConfig, rootReducer);

  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);

  return { store, persistor };
};

const createdStore = initializeStore(rootReducer);
sagaMiddleware.run(applicationSaga);
sagaMiddleware.run(orderSaga);
sagaMiddleware.run(persistedUserSaga);
sagaMiddleware.run(userSaga);

export const store = createdStore.store;
export const persistor = createdStore.persistor;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
