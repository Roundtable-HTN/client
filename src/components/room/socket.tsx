import * as React from "react";
import io from 'socket.io-client';

const socket = io();
export const SocketContext = React.createContext(socket);

declare const window: any;
window.socket = socket;

export const SocketProvider = (props: { children: React.ReactNode }) => {
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}
