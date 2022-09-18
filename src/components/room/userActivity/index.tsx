import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { User } from '../../../util/models';
import { Chat } from '../chat';

export const UserActivity = (props: { roomId: string }): JSX.Element => {
    const drawerWidth = 240;
    const roomId = props.roomId;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        RoundTable Room <strong>{roomId}</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    paddingBottom: 4,
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', paddingBottom: 10 }}>
                    <Typography variant="h6" marginLeft={1.5} marginTop={1}>
                        Online Users
                    </Typography>
                    <List>
                        {onlineUsers([{ username: "Patrick", online: true }])}
                    </List>

                    <Divider />

                    <Typography variant="h6" marginLeft={1.5} marginTop={0}>
                        Offline Users
                    </Typography>
                    <List>
                        {offlineUsers([{ username: "Jimmy", online: false }])}
                    </List>

                    <Divider />
                    <Chat />
                </Box>
            </Drawer>
        </Box>
    );
}

const onlineUsers = (users: User[]): JSX.Element[] => {
    return (
        users.map((user: User): JSX.Element => {
            return <UserStatus key={user.username} user={user} />
        })
    );
}

const offlineUsers = (users: User[]): JSX.Element[] => {
    return (
        users.map((user: User): JSX.Element => {
            return <UserStatus key={user.username} user={user} />
        })
    );
}

const UserStatus = (props: { user: User }): JSX.Element => {
    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={props.user.username} />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
