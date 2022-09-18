import React from 'react';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import { Message } from '../../../util/models';

const MessageElement = (props: { sender: string, children: any }): JSX.Element => {
    return (
        <p className="chat-message"><strong>{props.sender}: </strong>{props.children}</p>
    );
}

export const Chat = (): JSX.Element => {
    const [messages, setMessages] = React.useState([]);

    const msgRef = React.useRef("");

    const getMessages = (): JSX.Element[] => {
        return messages.map((msg: Message): JSX.Element => {
            return <MessageElement sender={msg.username}>{msg.content}</MessageElement>
        });
    }

    const sendMessage = (): void => {
        // @ts-ignore
        const content = msgRef.current.value;
        if (content) {
            // @ts-ignore
            setMessages([...messages, { username: username, content: content }]); // @ts-ignore
            msgRef.current.value = "";
        }
    }

    return (
        <>
            <Paper style={{ overflow: 'auto' }}>
                <div className="chat-container">
                    {getMessages()}
                </div>
                <div className="write-message">
                    <TextField
                        inputRef={msgRef}
                        label="Type a message here"
                        variant="standard"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault();
                                sendMessage();
                            }
                        }}
                    />
                </div>
            </Paper>
        </>
    );
}
