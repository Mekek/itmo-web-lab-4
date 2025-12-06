import { useEffect, useState } from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${props => props.type === 'error' ? '#f44336' : '#4caf50'};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

function Notification({ message, type = 'error', duration = 3000, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onClose(), 300); // Wait for fade out
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <NotificationContainer type={type}>
            {message}
        </NotificationContainer>
    );
}

export default Notification;