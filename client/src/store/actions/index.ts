import {
  ICompleteAction,
  ICreateAction,
  IDeleteAction,
  IHideAlertAction,
  IShowAlertAction,
  ITodo,
  ITodoActionTypes,
} from '../../types';

export const getTodos = () => {
  return {
    type: ITodoActionTypes.GET_TODOS,
  };
};

export const createTodo = (payload: string): ICreateAction => {
  return {
    type: ITodoActionTypes.CREATE_TODO,
    payload,
  };
};

export const deleteTodo = (payload: string): IDeleteAction => {
  return {
    type: ITodoActionTypes.DELETE_TODO,
    payload,
  };
};

export const completeTodo = (id: string, done: boolean): ICompleteAction<Partial<ITodo>> => {
  return {
    type: ITodoActionTypes.COMPLETE_TODO,
    payload: {
      id,
      done,
    },
  };
};

export const editTodo = (id: string, done: boolean, title: string) => {
  return {
    type: ITodoActionTypes.EDIT_TODO,
    payload: {
      id,
      done,
      title,
    },
  };
};

export const showAlert = (text: string, status: string): IShowAlertAction => {
  return {
    type: ITodoActionTypes.SHOW_ALERT,
    payload: text,
    status,
  };
};

export const hideAlert = (): IHideAlertAction => {
  return {
    type: ITodoActionTypes.HIDE_ALERT,
  };
};
