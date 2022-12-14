import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "./store/store";
import {fetchData, getUsers} from "./store/usersSlice";
import UsersPage from "./pages";

const App = () => {
    const dispatch = useAppDispatch();
    const users = useSelector(getUsers);
    useEffect(() => {
        dispatch(fetchData());
    }, []);
    return <div>
        {
            users.length === 0 ? "Идет загрузка" : <UsersPage users={users} />
        }
    </div>
}

export default App;