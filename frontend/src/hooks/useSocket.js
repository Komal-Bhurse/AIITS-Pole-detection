// hooks/useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend

export const useSocket = (onPoleAdded) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('pole-added', (data) => {
      console.log('Pole Added:', data);
      if (onPoleAdded) onPoleAdded(data);
    });

    return () => socket.disconnect();
  }, [onPoleAdded]);
};
