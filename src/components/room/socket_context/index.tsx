import * as React from "react";
import io from 'socket.io-client';

const socket = io();
export const SocketContext = React.createContext<any>({});

declare const window: any;
window.socket = socket;

export const SocketProvider = (props: { children: React.ReactNode }) => {
    const [value, setValue] = React.useState({
        username: "",
        sessionId: 0,
        socket: socket,
    });
    return (
        <SocketContext.Provider value={{ value: value, setValue: setValue }}>
            {props.children}
        </SocketContext.Provider>
    );
}
