import { Reducer, combineReducers } from 'redux';
import { ITodoState } from '../types';
import { alertReducer } from './alertReducer';
import { todoReducer } from './todoReducer';

export const rootReducer = combineReducers({
  alertReducer,
  todoReducer: todoReducer as Reducer<ITodoState>,
});
