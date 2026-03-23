import toast from "react-hot-toast";
import { useCallback } from "react";

export const useToast = () => {
    const success = useCallback((msg: string) => toast.success(msg), []);
    const error = useCallback((msg: string) => toast.error(msg), []);

    const promise = useCallback(
        <T,>(
            promise: Promise<T>,
            msgs: { loading: string; success: string; error: string }
        ) => {
            return toast.promise(
                promise,
                {
                    loading: msgs.loading,
                    success: msgs.success,
                    error: msgs.error,
                },
                {
                    style: {
                        borderRadius: '8px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        },
        []
    );

    return { success, error, promise };
};