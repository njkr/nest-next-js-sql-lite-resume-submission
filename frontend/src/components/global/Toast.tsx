// src/components/Toast.tsx
import React, { useEffect } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setToast } from '@/redux/toastSlice';

const Toast: React.FC = () => {
    const dispatch = useDispatch();
    const { open, message, type, duration } = useSelector((state: RootState) => state.toast);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                dispatch(setToast({ open: false, message, type, duration }));
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [dispatch, open, message, type, duration]);

    const Icon = type === 'success' ? CheckCircle : Error;

    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={() => dispatch(setToast({ open: false, message, type, duration }))}
        >
            <SnackbarContent
                sx={{
                    backgroundColor: type === 'success' ? 'green' : 'red',
                    color: 'white',
                }}
                message={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon sx={{ marginRight: 1 }} />
                        {message}
                    </span>
                }
                action={
                    <IconButton size="small" onClick={() => dispatch(setToast({ open: false, message, type, duration }))}>
                        <span style={{ color: 'white' }}>X</span>
                    </IconButton>
                }
            />
        </Snackbar>
    );
};

export default Toast;
