import { createContext, useState, useContext } from 'react';
import Notification from './Notification';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'error', duration = 3000) => {
        setNotification({ message, type, duration });
    };

    const hideNotification = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    onClose={hideNotification}
                />
            )}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};