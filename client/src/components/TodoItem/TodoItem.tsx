import { useEffect, useRef, useState } from 'react';
import { ITodo } from '../../types';
import './TodoItem.css';

interface ITodoItemProps extends ITodo {
  deleteTodo: (id: string) => void;
  doneTodo: (id: string, done: boolean) => void;
  changeTodo: (title: string, done: boolean, id: string) => void;
}

export const TodoItem = ({ id, title, done, changeTodo, deleteTodo, doneTodo }: ITodoItemProps) => {
  const [isTodoEdit, setIsTodoEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeTodo(newTitle, done, id);
      setIsTodoEdit((prev) => !prev);
    }
  };

  const handleTodoEdit = () => {
    if (isTodoEdit) {
      changeTodo(newTitle, done, id);
    }
    setIsTodoEdit((prev) => !prev);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleComplete = () => {
    doneTodo(id, !done);
  };

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [isTodoEdit]);

  return (
    <li
      className={`todo-item list-group-item d-flex justify-content-between align-items-center
    ${done ? 'list-group-item-success' : ''}`}
    >
      <div className='todo-text' onKeyUp={handleSubmit}>
        {isTodoEdit ? (
          <input type='text' ref={ref} onChange={handleTitleChange} />
        ) : (
          <span className={`${done ? 'title-done' : ''}`}>{title}</span>
        )}
      </div>

      <div className='todo-btns'>
        <button onClick={handleTodoEdit} className='todo-btn btn btn-primary'>
          Change
        </button>

        <button onClick={handleComplete} className='todo-btn btn btn-success'>
          Done
        </button>

        <button onClick={handleDelete} className='todo-btn btn btn-danger'>
          Remove
        </button>
      </div>
    </li>
  );
};
