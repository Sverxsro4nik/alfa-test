import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store/store';
import { fetchData, getLoading, getUsers } from './features/user/usersSlice';
import UsersPage from './pages';

const App = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const isLoading = useSelector(getLoading);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return <div>{!isLoading ? <UsersPage users={users} /> : 'Данные загружаются'}</div>;
};

export default App;
