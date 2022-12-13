import React, {FC} from "react";
import {User} from "../store/usersSlice";

interface UsersProps {
    users: User[];
}

const Users: FC<UsersProps> = ({users}) => {
    return(
        <div className="users">
            {
                users.map((user) => <div className="user">
                    <h2>{user.lastName}</h2>
                    <img src={user.avatar} alt={user.firstName} />
                </div>)
            }
        </div>
    )
}

export default Users;