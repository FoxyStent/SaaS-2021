import '../styles/App.css';
import React from "react";
import logo from "../logo192.png";

const  Footer = () => {
    return (
        <div className={"footer bg-dark"}>
            <button className={"col btn btn-link text-decoration-none"}>About Us</button>
            <button className={"col btn btn-link text-decoration-none"}>Contact Us</button>
            <button className={"col btn btn-link text-decoration-none"}>Project Documentation</button>
            <button className={"col btn btn-link text-decoration-none"}>Link on GitHub</button>
            <button className={"col btn btn-link text-decoration-none"}>Course Materials</button>
        </div>
    )
}

export default Footer;