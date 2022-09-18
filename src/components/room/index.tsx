import * as React from "react";
import io from 'socket.io-client';
import { useSearchParams } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { SideNav } from "./sidenav";
import { UserActivity } from "./userActivity";
import { RoundTable } from "./roundtable";

const drawerWidth = 240;
const socket = io();

export const Room = (props: any): JSX.Element => {
    const roomId = "Bob";

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [isConnected, setIsConnected] = React.useState(socket.connected);
    const [error, setError] = React.useState("");

    React.useEffect((): any => {
        if (!searchParams.get("code")) {
            setError("No room code");
        }
        else if (searchParams.get("action") !== "join" && searchParams.get("action") !== "create") {
            setError("Invalid action");
        }
        else {
            socket.on('connect', () => {
                socket.emit(`${searchParams.get("action")}_room`, { code: searchParams.get("code") }, (response: any) => {
                    if (response == "ok") {
                        setIsConnected(true);
                    }
                    else {
                        setError(`Could not ${searchParams.get("action")} room`);
                    }
                })
            });

            socket.on('disconnect', () => {
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

    const container = window !== undefined ? () => window().document.body : undefined;

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

            <UserActivity roomId={roomId} />
        </Box>
    );
}
