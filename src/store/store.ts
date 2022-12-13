import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';
import {useDispatch} from "react-redux";
export const store = configureStore(({
    reducer: {
        cards: usersReducer,
    },
}));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;