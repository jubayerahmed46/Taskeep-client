import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_apiUrl, { withCredential: true });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return <SocketContext value={socket}>{children}</SocketContext>;
}
export { SocketContext, SocketProvider };
