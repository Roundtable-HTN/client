import * as React from "react";
import io from 'socket.io-client';

const socket = io();
export const SocketContext = React.createContext(socket);
export const SocketValues = React.createContext({
    username: "",
    sessionId: "",
});

declare const window: any;
window.socket = socket;

export const SocketProvider = (props: { children: React.ReactNode }) => {
    const [value, setValue] = React.useState({
        username: "",
        sessionId: "",
    });
    return (
        <SocketContext.Provider value={socket}>
            <SocketValues.Provider value={value}>
                {props.children}
            </SocketValues.Provider>
        </SocketContext.Provider>
    );
}
