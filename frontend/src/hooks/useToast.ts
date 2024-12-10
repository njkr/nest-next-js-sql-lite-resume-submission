import { setToast } from '../redux/toastSlice';
import { useAppDispatch } from '@/redux/hooks';

const useToast = () => {
    const dispatch = useAppDispatch();

    const showSuccess = (message: string, duration: number = 3000) => {
        dispatch(
            setToast({
                open: true,
                message,
                type: 'success',
                duration,
            })
        );
    };

    const showError = (message: string, duration: number = 3000) => {
        dispatch(
            setToast({
                open: true,
                message,
                type: 'error',
                duration,
            })
        );
    };

    return {
        showSuccess,
        showError,
    };
};

export default useToast;
