
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const NotificationContext = createContext(null);

const defaultNotifications = {
    studyReminders: true,
    taskDueDateAlerts: true,
    focusSessionNotifications: true,
};

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useLocalStorage(
        "academia-notifications",
        defaultNotifications
    );

    const updateNotification = (setting, enabled) => {
        setNotifications((previousNotifications) => ({
            ...previousNotifications,
            [setting]: enabled,
        }));
    };

    const resetNotifications = () => {
        setNotifications(defaultNotifications);
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                updateNotification,
                resetNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotifications must be used inside NotificationProvider"
        );
    }

    return context;
}

