import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import { sagaWatcher } from './sagas/sagas';

const saga = createSagaMiddleware();

export const store = createStore(rootReducer, compose(applyMiddleware(saga)));

saga.run(sagaWatcher);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
