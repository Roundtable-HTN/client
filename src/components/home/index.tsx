import * as React from "react";

import { Box, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@mui/material/styles";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Container from '@mui/material/Container';
import { default as axios } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Home = (): JSX.Element => {
    const joinRef = React.useRef("");
    const nav: NavigateFunction = useNavigate();

    const onJoin = (): void => {
        // @ts-ignore
        const roomCode: string = joinRef.current.value;
        axios.post("/api/leyangimplementfaster", {
            "username": "baf",
            "code": roomCode,
        }).then((res): void => {
            nav(`/table?id=${res.data.id}`);
        }).catch((err): void => {
            console.log("Error occured when joining room:", err);
        });
    }

    return (
        <div id="homepage">
            <Container maxWidth="sm">
                <Stack spacing={10} direction="row">
                    <div className="home-header">
                        <Typography variant="h1">
                            RoundTable
                        </Typography>

                        <div className="subtitle">
                            <Typography variant="subtitle1" fontSize={24} gutterBottom>
                                A round table for well-rounded people!
                            </Typography>
                        </div>

                        <Stack spacing={1} direction="row">
                            <Box bgcolor="white">
                                <TextField
                                    inputRef={joinRef}
                                    label="Enter room join code:"
                                    variant="filled"
                                />
                            </Box>
                            <Button variant="contained" onClick={onJoin}>Join room!</Button>
                        </Stack>
                    </div>
                    <img className="table-image" src={"img/roundtable.png"} />
                </Stack>
            </Container>
        </div>
    );
}