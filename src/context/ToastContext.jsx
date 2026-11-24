
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
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
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-secondary)] font-bold">
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
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}
