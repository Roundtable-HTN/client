import * as React from "react";
import { useSearchParams } from "react-router-dom";

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { SideNav } from "./sidenav";
import { UserActivity } from "./userActivity";
import { RoundTable } from "./roundtable";

import { SocketContext, SocketProvider } from "./socket_context";
import { SocketInfo } from "../../util/models";
import { Socket } from "socket.io-client";

const drawerWidth = 240;

const _Room = (props: any): JSX.Element => {
    const ctx = React.useContext(SocketContext);
    const values = ctx.value;
    const socket: Socket = ctx.value.socket;

    const { windoww } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [isConnected, setIsConnected] = React.useState(socket.connected);
    const [error, setError] = React.useState("");

    React.useEffect((): any => {
        const code = searchParams.get("code");

        // good but baf concurrency
        console.log(values);
        if (!values.sessionId) {
            console.log("URMUM");
            let username = `bob_${Date.now()}`;
            socket.emit(`user_register`, {name: username}, (response: number): void => {
                console.log(response);
                socket.auth.userId = response;
                console.log(socket.auth);
                socket.disconnect().connect();
                ctx.setValue({ ...values, sessionId: response, username: username  });
            });
        }

        if (!searchParams.get("code")) {
            setError("No room code");
        }
        else if (searchParams.get("action") !== "join" && searchParams.get("action") !== "create") {
            setError("Invalid action");
        }
        else {
            console.log("amoog");
            socket.on('connect', () => {
                console.log("amoog2");
                socket.emit(`room_${searchParams.get("action")}`, { code: code }, (response: any) => {
                    socket.roomCode = code;
                    console.log(response);
                    if (response == "ok") {
                        setIsConnected(true);
                    }
                    else {
                        setError(`Could not ${searchParams.get("action")} room`);
                    }
                });
            });

            socket.on('disconnect', (): void => {
                setIsConnected(false);
            });

            return (): void => {
                socket.off('connect');
                socket.off('disconnect');
            };
        }
    }, []);

    const handleDrawerToggle = (): void => {
        setMobileOpen(!mobileOpen);
    };

    const drawer: JSX.Element = (
        <div>
            <Toolbar />
            <Divider />

            <SideNav />
        </div>
    );

    const container = windoww !== undefined ? () => windoww().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <RoundTable />
            </Box>

            <UserActivity roomId={searchParams.get("code")!} />
        </Box>
    );
}

export const Room = (props: any): JSX.Element => {
    return (
        <SocketProvider>
            <_Room />
        </SocketProvider>
    )
}