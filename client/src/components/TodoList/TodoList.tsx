import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { TodoItem } from '../TodoItem';

import { completeTodo, deleteTodo, editTodo } from '../../store/actions';
import './TodoList.css';

export const TodoList = () => {
  const state = useAppSelector((state) => state.todoReducer.todos);

  const dispatch = useAppDispatch();

  const changeTodo = (title: string, done: boolean, id: string) => {
    dispatch(editTodo(id, done, title));
  };

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const doneTodo = (id: string, done: boolean) => {
    dispatch(completeTodo(id, done));
  };

  return (
    <TransitionGroup component='ul' className='list-group'>
      {state.map(({ id, done, title }) => (
        <CSSTransition timeout={800} classNames='todo' key={id}>
          <TodoItem
            key={id}
            title={title}
            done={done}
            id={id}
            deleteTodo={removeTodo}
            doneTodo={doneTodo}
            changeTodo={changeTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
