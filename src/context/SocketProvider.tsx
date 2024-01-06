import React, { useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface ISocketContext {
    messages: string[];
    sendMessage: (msg: string) => any;
}

interface SocketProviderProps {
    children: React.ReactNode;
}

const SocketrContext = React.createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState([]);
    const sendMessage: ISocketContext["sendMessage"] = useCallback(
        (msg) => {
            if (socket) socket.emit("event:message", { message: msg });
        },
        [socket]
    );

    const onMsgReceived = useCallback((msg: string) => {
        console.log("FRom server message received ", msg);
        const messageObj = JSON.parse(msg);
        setMessages((prev) => [...prev, messageObj]);
    }, []);

    useEffect(() => {
        console.log("THis chat app has started now...");

        const _socket = io("http://localhost:8000");
        _socket.on("message", onMsgReceived);
        setSocket(_socket);
        return () => {
            _socket.off("message", onMsgReceived);
            _socket.disconnect();
            setSocket(undefined);
        };
    }, []);

    return (
        <SocketrContext.Provider value={{ messages, sendMessage }}>
            {children}
        </SocketrContext.Provider>
    );
};

export const useSocket = () => {
    const state = useContext(SocketrContext);
    if (!state) throw new Error("State is udefined");
    return state;
};
