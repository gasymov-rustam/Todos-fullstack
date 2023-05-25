import { call, Effect, put, takeEvery } from 'redux-saga/effects';
import { ICompleteAction, ICreateAction, IDeleteAction, IEditAction, ITodo, ITodoActionTypes } from '../../types';

import { TodoApi } from '../../api';
import { hideAlert, showAlert } from '../actions';

// import { hideAlert, showAlert } from '../actions/index';

const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

function* sagaGetTodos(): Generator<Effect, void, ITodo[]> {
  try {
    const todos = yield call(TodoApi.getTodos);

    yield put({ type: ITodoActionTypes.GET_TODOS_SUCCESS, payload: todos });
    yield put(showAlert('Todos successfully loaded', 'success'));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`Can not load todos: ${error}`, 'warning'));
  }
}

function* sagaCreateTodo(action: ICreateAction): Generator<Effect, void> {
  try {
    const todoObject: Partial<ITodo> = {
      title: action.payload,
      done: false,
    };

    const todo = yield call(TodoApi.createTodo, todoObject);

    yield put({ type: ITodoActionTypes.CREATE_TODO_SUCCESS, payload: todo });
    yield put(showAlert('Todo successfully created', 'success'));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`Can not create todo: ${error}`, 'warning'));
  }
}

function* sagaDeleteTodo(action: IDeleteAction): Generator<Effect, void> {
  try {
    yield call(TodoApi.deleteTodo, action.payload);

    yield put({ type: ITodoActionTypes.DELETE_TODO_SUCCESS, payload: action.payload });
    yield put(showAlert('Todo successfully deleted', 'success'));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`Can not delete todo: ${error}`, 'warning'));
  }
}

function* sagaCompleteTodo(action: ICompleteAction<ITodo>): Generator<Effect, void> {
  try {
    const todoObject: Partial<ITodo> = {
      done: action.payload.done,
      id: action.payload.id,
    };

    yield call(TodoApi.completeTodo, todoObject);

    yield put({ type: ITodoActionTypes.COMPLETE_TODO_SUCCESS, payload: action.payload.id });
    yield put(showAlert(`Todo successfully ${action.payload.done ? 'done' : 'restore'} `, 'success'));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`Can not done todo: ${error}`, 'warning'));
  }
}

function* sagaEditTodo(action: IEditAction): Generator<Effect, void, ITodo> {
  try {
    const todoObject: Partial<ITodo> = {
      done: action.payload.done,
      id: action.payload.id,
      title: action.payload.title,
    };

    const todo = yield call(TodoApi.editTodo, todoObject);

    yield put({ type: ITodoActionTypes.EDIT_TODO_SUCCESS, payload: todo, id: action.payload.id });
    yield put(showAlert('Todo successfully changed', 'success'));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`Can not change todo:: ${error}`, 'warning'));
  }
}

export function* sagaWatcher(): Generator<Effect, void> {
  yield takeEvery(ITodoActionTypes.CREATE_TODO, sagaCreateTodo);
  yield takeEvery(ITodoActionTypes.DELETE_TODO, sagaDeleteTodo);
  yield takeEvery(ITodoActionTypes.GET_TODOS, sagaGetTodos);
  yield takeEvery(ITodoActionTypes.COMPLETE_TODO, sagaCompleteTodo);
  yield takeEvery(ITodoActionTypes.EDIT_TODO, sagaEditTodo);
}
