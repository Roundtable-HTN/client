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
    sessionId: string;
}
