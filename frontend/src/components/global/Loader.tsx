import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';

const Loader: React.FC = () => {
    const { loading } = useAppSelector((state) => state.dashboard);

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;