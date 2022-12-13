import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState, store, useAppDispatch} from "./store/store";
import {fetchData, getUsers, User} from "./store/usersSlice";
import Users from "./pages";

const App = () => {
    const dispatch = useAppDispatch();
    const users = useSelector(getUsers);
    console.log(users);
    useEffect(() => {
        dispatch(fetchData());
    }, []);
    return <div>
        {
            users.length === 0 ? "Идет загрузка" : <Users users={users} />
        }
    </div>
}

export default App;