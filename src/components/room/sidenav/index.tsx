import * as React from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { HomeIcon } from "../../../util/icons";
import ExtensionIcon from '@mui/icons-material/Extension';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { SocketContext } from "../socket_context";

const SideNavItem = (props: { text: string, click: () => void, icon: JSX.Element }): JSX.Element => {
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={props.click}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItemButton>
        </ListItem>
    )
}

export const SideNav = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    return (
        <List>
            <SideNavItem
                text="Back to Home"
                click={(): void => { nav("/") }}
                icon={<HomeIcon />}
            />

            <Divider />

            {plugins()}
        </List>
    )
}

const plugins = (): Array<JSX.Element> => {
    const ctx = React.useContext(SocketContext);
    return (
        [
            <SideNavItem
                key="1"
                text="Add Connect 4"
                click={(): void => {
                    // @ts-ignore
                    createPluginConnectFour();
                    ctx.value.socket.emit("plugin_instance_create", 1);
                }}
                icon={<VideogameAssetIcon />}
            />
        ]
    )
}
