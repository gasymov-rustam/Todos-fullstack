import { useState } from 'react';
import { createTodo, showAlert } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { IAlertReducer } from '../../types';
import { Alert } from '../Alert';
import './TodoForm.css';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const alertState = useAppSelector((state: IAlertReducer) => state.alertReducer);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      dispatch(showAlert('Title of task can not be empty', 'warning'));
      return;
    }

    dispatch(createTodo(title));
    setTitle('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {!!alertState.alertText.length && <Alert props={alertState} />}

      <div className='mb-3 d-flex align-items-end justify-content-between'>
        <div className='form-group todoForm__input'>
          <label htmlFor='text' className='form-label'>
            Enter todo name
          </label>

          <input type='text' id='text' className='form-control' value={title} onChange={handleChange} />
        </div>

        <button type='submit' className='btn btn-success todoForm__btn'>
          Create
        </button>
      </div>
    </form>
  );
};
