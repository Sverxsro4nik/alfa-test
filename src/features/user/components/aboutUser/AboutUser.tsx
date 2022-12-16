import React, { FC } from 'react';
import { updateUser, User } from '../../usersSlice';
import { GrLike } from 'react-icons/gr';
import './AboutUser.css';
import { useAppDispatch } from '../../../../store/store';

interface AboutUserProps {
  user: User;
  removeHandler: (id: number) => void;
}

const AboutUser: FC<AboutUserProps> = ({ user, removeHandler }) => {
  const dispatch = useAppDispatch();
  const likeHandler = () => {
    const { id, like } = user;
    dispatch(updateUser({ id, changes: { like: !like } }));
  };
  return (
    <>
      <div className="card-header">
        <h2>{user.first_name}</h2>
        <button
          type="button"
          className={user.like ? 'likeButton liked' : 'likeButton'}
          onClick={likeHandler}
        >
          <GrLike />
        </button>
      </div>
      <img src={user.avatar} alt={user.first_name} width={300} height={300} />
      <button type="button" className="deleteButton" onClick={() => removeHandler(user.id)}>
        Удалить
      </button>
    </>
  );
};
export default AboutUser;
