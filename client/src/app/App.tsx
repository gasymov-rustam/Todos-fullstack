import { useEffect } from 'react';
import { Header, TodoForm, TodoList } from '../components';
import { getTodos } from '../store/actions';
import { useAppDispatch } from '../store/store';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      <Header />

      <main className='container pt-5'>
        <TodoForm />

        <h2 className='pt-3'>Todo List</h2>

        <TodoList />
      </main>
    </>
  );
};
