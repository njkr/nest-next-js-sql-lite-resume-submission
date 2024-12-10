import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
    open: boolean;
    message: string;
    type: 'success' | 'error';
    duration: number;
}

const initialState: ToastState = {
    open: false,
    message: '',
    type: 'success',
    duration: 3000, // default duration 3 seconds
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<ToastState>) => {
            state.open = action.payload.open;
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.duration = action.payload.duration;
        },
    },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
