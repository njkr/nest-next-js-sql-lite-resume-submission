import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToast } from './toastSlice';
import { useRouter } from 'next/router';

const url = "http://localhost:3001/"

export const postResume = (data: any, router: ReturnType<typeof useRouter>) => async (dispatch: any) => {
    dispatch(setLoading());
    try {
        const response = await axios.post(`${url}resume`, data);

        if (response.data.statusCode !== 201) {
            dispatch(
                setToast({
                    open: true,
                    message: 'something went wrong',
                    type: 'error',
                    duration: 3000,
                })
            );
            dispatch(unsetLoading());
            return;
        }

        dispatch(
            setToast({
                open: true,
                message: 'resume posted successfully',
                type: 'success',
                duration: 3000,
            })
        );
        router.push('/');
    } catch (error: any) {
        dispatch(
            setToast({
                open: true,
                message: error.message,
                type: 'error',
                duration: 3000,
            })
        );
        dispatch(unsetLoading());
    }
}

export const getResume = (data: any) => async (dispatch: any) => {
    dispatch(setLoading());
    try {
        const response = await axios.get(`${url}resume?page=${data.page}&take=${data.limit}`);

        if (response.data.statusCode !== 200) {
            dispatch(
                setToast({
                    open: true,
                    message: 'something went wrong',
                    type: 'error',
                    duration: 3000,
                })
            );
            dispatch(unsetLoading());
            return;
        }

        dispatch(
            setToast({
                open: true,
                message: 'Data fetched successfully',
                type: 'success',
                duration: 3000,
            })
        );
        dispatch(setData(response.data.data));
    } catch (error: any) {
        dispatch(
            setToast({
                open: true,
                message: error.message,
                type: 'error',
                duration: 3000,
            })
        );
        dispatch(unsetLoading());
    }
}

interface DashboardState {
    data: any[];
    loading: boolean;
}

const initialState: DashboardState = {
    data: [],
    loading: false,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setData: (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
            state.loading = false;
        },
        unsetLoading: (state) => {
            state.loading = false;
        },
    }
});

export const { setLoading, setData, unsetLoading } = dashboardSlice.actions;

export default dashboardSlice.reducer;