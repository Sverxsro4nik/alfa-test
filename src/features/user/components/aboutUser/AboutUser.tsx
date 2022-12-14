import React, {FC} from "react";
import {removeUser, User} from "../../../../store/usersSlice";
import { GrLike } from 'react-icons/gr';
import './AboutUser.css';
import {useAppDispatch} from "../../../../store/store";

const AboutUser: FC<User> = ({...user}) => {
    const dispatch = useAppDispatch();
    const removeHandler = () => {
        dispatch(removeUser(user.id));
    }
    return (
        <>
            <div className="card-header">
                <h2>{user.first_name}</h2>
                <button className="likeButton"><GrLike /></button>
            </div>
            <img src={user.avatar} alt={user.first_name} width={300} height={300}/>
            <button className="deleteButton" onClick={removeHandler}>Удалить</button>
        </>
    )
}
export default AboutUser;