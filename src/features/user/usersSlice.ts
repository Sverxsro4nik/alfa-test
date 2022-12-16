import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store/store';

export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  like: boolean;
}

export const fetchData = createAsyncThunk('users/fetchUsers', async () => {
  const { data } = await axios.get<User[]>('https://random-data-api.com/api/v2/users?size=10');
  return data;
});
type usersInitialState = {
  isLoading: boolean;
  loadingError: null | string;
};

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState<usersInitialState>({
  isLoading: false,
  loadingError: null,
});

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const userWithLikes = payload.map((item) => ({ ...item, like: false }));
        usersAdapter.setAll(state, userWithLikes);
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.isLoading = false;
        state.loadingError = error as string;
      });
  },
});

export const selectors = usersAdapter.getSelectors((state: RootState) => state.users);
export const getLoading = (state: RootState) => state.users.isLoading;
export const getUsers = (state: RootState) => selectors.selectAll(state);
export const { removeUser, updateUser } = usersReducer.actions;
export default usersReducer.reducer;
