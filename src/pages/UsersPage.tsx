import React, {FC} from "react";
import {User} from "../store/usersSlice";
import AboutUser from "../features/user/components/aboutUser";
import './UsersPage.css';

interface UsersProps {
    users: User[];
}

const UsersPage: FC<UsersProps> = ({users}) => {
    return(
        <main className="usersCards">
            <h2>Список пользователей</h2>
            <div className="users">
                {
                    users.map((user) => <div className="user" key={user.id}>
                        <AboutUser
                            id={user.id}
                            avatar={user.avatar}
                            first_name={user.first_name}
                            last_name={user.last_name}
                            like={user.like}
                        />
                    </div>)
                }
            </div>
        </main>
    )
}

export default UsersPage;