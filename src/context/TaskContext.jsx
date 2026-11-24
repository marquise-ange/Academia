
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);
    const timerRef = useRef(null);

    // Display a notification
    const showToast = useCallback((message, type = "success") => {
        // Clear the previous timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Display the new notification
        setToast({ message, type });

        // Automatically hide it after 3 seconds
        timerRef.current = setTimeout(() => {
            setToast(null);
            timerRef.current = null;
        }, 3000);
    }, []);

    // Clean up the timer when the provider unmounts
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--foreground)] shadow-lg"
                >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-secondary)] font-bold">
                        {toast.type === "success" ? "✓" : "!"}
                    </span>

                    <p>{toast.message}</p>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider"
        );
    }

    return context;
}
