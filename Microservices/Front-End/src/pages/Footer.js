import '../styles/App.css';
import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo192.png";

const  Footer = () => {
    return (
        <div className={"footer bg-dark"}>
            <Link className={"col btn btn-link text-decoration-none"}>About Us</Link>
            <Link className={"col btn btn-link text-decoration-none"}>Contact Us</Link>
            <Link to={{pathname: "https://github.com/FoxyStent/SaaS-2021/blob/master/Ask%20me%20Anything.vpp"}} target="_blank" className={"col btn btn-link text-decoration-none"}>Project Documentation</Link>
            <Link to={{pathname: "https://github.com/FoxyStent/SaaS-2021"}} target="_blank" className={"col btn btn-link text-decoration-none"}>Link on GitHub</Link>
            <Link className={"col btn btn-link text-decoration-none"}>Course Materials</Link>
        </div>
    )
}

export default Footer;