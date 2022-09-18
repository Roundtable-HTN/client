import { Button, Typography } from "@mui/material";
import * as React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const NotFound = () => {
    const nav: NavigateFunction = useNavigate();

    return (
        <>
            <Typography variant="h3">
                404 Error: Page Not Found!
            </Typography>
            <Typography variant="body1" style={{ marginTop: "1rem" }}>
                Press here to go back to the homepage:
            </Typography>
            <Button variant="contained" onClick={(ev: React.MouseEvent): void => {
                ev.preventDefault();
                nav("/#home");
            }}>Back to Home</Button>
        </>
    );
}