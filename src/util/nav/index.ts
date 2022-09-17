import { useNavigate } from "react-router-dom";
import { HomeIcon } from "../icons";

export const navItems: NavLink[] = [
    { text: "Home", href: "/" }, 
    { text: "About", href: "/#about" }, 
    { text: "Room", href: "/room" }
];

export interface Props {
    window?: () => Window;
}

export interface NavLink {
    text: string;
    href: string;
}
