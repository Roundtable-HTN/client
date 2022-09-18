import * as React from "react";

import { Box, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
    const [joinError, setJoinError] = React.useState("");

    const onJoin = (): void => {
        // @ts-ignore
        const roomCode: string = joinRef.current.value;
        if (roomCode) {
            nav(`/join?code=${roomCode}&action=join`);
        }
        else {
            setJoinError("Please enter a room code.");
        }
    }

    const onCreate = (): void => {
        // @ts-ignore
        const roomCode: string = joinRef.current.value;
        if (roomCode) {
            nav(`/join?code=${roomCode}&action=create`);
        }
        else {
            setJoinError("Please enter a room code.");
        }
    }

    const joinFieldChange = (): void => {
        setJoinError("");
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

                        <Stack spacing={0} direction="column">
                            <Stack spacing={1} direction="row">
                                <Box bgcolor="white">
                                    {
                                        joinError ?
                                            <TextField
                                                error
                                                id="join-field"
                                                inputRef={joinRef}
                                                label="Enter a room code:"
                                                variant="filled"
                                                onChange={joinFieldChange}
                                            />
                                            :
                                            <TextField
                                                id="join-field"
                                                inputRef={joinRef}
                                                label="Enter a room code:"
                                                variant="filled"
                                                onChange={joinFieldChange}
                                            />
                                    }
                                </Box>
                                <Button variant="contained" onClick={onJoin}>Join room!</Button>
                                <Button variant="contained" onClick={onCreate}>Create a room!</Button>
                            </Stack>
                            {
                                joinError ?
                                    <FormHelperText error id="component-error-text">{joinError}</FormHelperText>
                                    :
                                    <></>
                            }
                        </Stack>
                    </div>
                    <img className="table-image" src={"img/roundtable.png"} />
                </Stack>
            </Container>
        </div>
    );
}