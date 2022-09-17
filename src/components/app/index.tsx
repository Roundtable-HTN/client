import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";

import { NavBar } from "./nav";
import { NotFound } from "../notfound";

import M from 'materialize-css';
import "../index.scss";
import { Home } from "../home";

export const _App = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    React.useEffect((): void => {
        M.AutoInit();
    });

    return (
        <div className="page">
            <NavBar />

            <div className="router-outlet">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <_App />
        </BrowserRouter>
    );
}