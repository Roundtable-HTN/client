import React from 'react';
import TextField from '@mui/material/TextField';
import { Divider, IconButton, Paper, Typography } from '@mui/material';
import { Message } from '../../../util/models';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '../socket_context';

const MessageElement = (props: { sender: string, children: any }): JSX.Element => {
    return (
        <p className="chat-message"><strong>{props.sender}: </strong>{props.children}</p>
    );
}

export const Chat = (): JSX.Element => {
    const [messages, setMessages] = React.useState([]);
    const ctx = React.useContext(SocketContext);

    React.useEffect(() => {
        ctx.value.socket.on(`message_sent`, (response: any): void => {
            console.log("Message received");
            // @ts-ignore
            setMessages((prevMsgs) => [...prevMsgs, { username: response.username, content: response.msg }]);
        });
    }, []);

    const msgRef = React.useRef("");

    const getMessages = (): JSX.Element[] => {
        return messages.map((msg: Message, cnt: number): JSX.Element => {
            return <MessageElement key={cnt} sender={msg.username}>{msg.content}</MessageElement>
        });
    }

    const sendMessage = (): void => {
        const socket = ctx.value.socket;

        // @ts-ignore
        const content = msgRef.current.value;
        if (content) {
            // @ts-ignore
            msgRef.current.value = "";
            console.log(ctx.value.socket.auth);
            socket.emit(`send_message`, { username: ctx.value.username, code: ctx.value.socket.roomCode, msg: content }, (response: any): void => {
                if (response !== "ok") {
                    console.log("Error occurred when sending message:", response);
                }
            });
        }
    }

    return (
        <>
            <Typography variant="h6" marginLeft={1.5} marginTop={0}>
                Live Chat
            </Typography>
            <Paper style={{ overflow: 'auto' }}>
                <div className="chat-container">
                    {getMessages()}
                </div>
                <div className="write-message">
                    <div className="write-message-items">
                        <TextField
                            inputRef={msgRef}
                            label="Type a message here"
                            variant="filled"
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    ev.preventDefault();
                                    sendMessage();
                                }
                            }}
                        />
                        <IconButton onClick={sendMessage} color="primary" aria-label="upload picture" component="label">
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </Paper>
        </>
    );
}
