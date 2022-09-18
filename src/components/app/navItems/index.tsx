import * as React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { HomeIcon } from "../../../util/icons";
import InfoIcon from '@mui/icons-material/Info';

export const NavDrawerItems = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => { nav("/#home") }} sx={{ textAlign: "center" }}>
                    <HomeIcon />
                    <ListItemText primary={"Home"} />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => { nav("/#about") }} sx={{ textAlign: "center" }}>
                    <InfoIcon />
                    <ListItemText primary={"About"} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

export const NavItems = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    return (
        <>
            <Button onClick={() => { nav("/#home") }} sx={{ color: "#fff" }}>
                <HomeIcon />
                <div className="nav-item-label">Home</div>
            </Button>

            <Button onClick={() => { nav("/#about") }} sx={{ color: "#fff" }}>
                <InfoIcon />
                <div className="nav-item-label">About</div>
            </Button>
        </>
    );
}
