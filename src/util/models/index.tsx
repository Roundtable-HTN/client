import { Socket } from "socket.io-client";
import * as React from "react";

export interface User {
    username: string;
    online: boolean;
}

export interface Message {
    username: string;
    content: string;
}

export interface SocketInfo {
    username: string;
    sessionId: number;
    socket: Socket;
}
