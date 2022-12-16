import React, { FC, useState } from 'react';
import { removeUser, User } from '../features/user/usersSlice';
import AboutUser from '../features/user/components/aboutUser';
import './UsersPage.css';
import { useAppDispatch } from '../store/store';

interface UsersProps {
  users: User[];
}

const UsersPage: FC<UsersProps> = ({ users }) => {
  const dispatch = useAppDispatch();
  const [showLiked, setShowLiked] = useState<boolean>(false);
  const showHandler = () => {
    setShowLiked(!showLiked);
  };
  const removeHandler = (id: number) => {
    console.log('click');
    dispatch(removeUser(id));
  };
  return (
    <main className="usersCards">
      <h2>Список пользователей</h2>
      <button className="showLiked" onClick={showHandler}>
        Отмеченные пользователи
      </button>
      <div className="users">
        {showLiked
          ? users
              .filter((user) => user.like)
              .map((user) => (
                <div className="user" key={user.id}>
                  <AboutUser user={user} removeHandler={removeHandler} />
                </div>
              ))
          : users.map((user) => (
              <div className="user" key={user.id}>
                <AboutUser user={user} removeHandler={removeHandler} />
              </div>
            ))}
      </div>
    </main>
  );
};

export default UsersPage;
