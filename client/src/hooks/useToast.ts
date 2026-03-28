import { useCallback } from "react";
import toast from "react-hot-toast";

export const useToast = () => {
    const success = useCallback((msg: string) => toast.success(msg), []);
    const error = useCallback((msg: string) => toast.error(msg), []);

    const promise = useCallback(
        <T,>(
            promise: Promise<T>,
            msgs: { loading: string; success: string; error: string; }
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
                        background: 'var(--color-card)',
                        color: 'var(--color-foreground)',
                    },
                }
            );
        },
        []
    );

    return { success, error, promise };
};