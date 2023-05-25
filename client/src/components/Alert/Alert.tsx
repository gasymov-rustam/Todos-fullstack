import { useEffect } from 'react';
import { hideAlert } from '../../store/actions';
import { useAppDispatch } from '../../store/store';
import { IAlertState } from '../../types';

import './Alert.css';

interface IAlertProps {
  props: IAlertState;
}

export const Alert = ({ props }: IAlertProps) => {
  const dispatch = useAppDispatch();

  const handleAlertClose = () => dispatch(hideAlert());

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
      {props.alertText}
      <button onClick={handleAlertClose} className='btn-close alert-btn' />
    </div>
  );
};
