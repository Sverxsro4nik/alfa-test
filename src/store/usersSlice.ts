import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {RootState, store} from "./store";

export interface User {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    like: boolean;
}

export const fetchData = createAsyncThunk(
    'users/fetchUsers',
    async (payload) => {
        const {data}= await axios.get<User[]>('https://random-data-api.com/api/v2/users?size=10');
        return data;
    }
)
type initialState = {
    isLoading: boolean;
    loadingError: null | string;
}

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState<initialState>({
    isLoading: false,
    loadingError: null,
});

const usersReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        removeUser: usersAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
            state.loadingError = null;
        }).addCase(fetchData.fulfilled, (state, { payload }) => {
            const userWithLikes = payload.map((item) => ({...item, like: false}))
            usersAdapter.addMany(state, userWithLikes);
            state.isLoading = false;
            state.loadingError = null;
        }).addCase(fetchData.rejected, (state, {error}) => {
            state.isLoading = false;
            state.loadingError = error as string;
        })
    }
});

// @ts-ignore
export const selectors = usersAdapter.getSelectors((state) => state.users);
export const getUsers = (state: RootState) => selectors.selectAll(state);
export const { removeUser } = usersReducer.actions;
export default usersReducer.reducer;