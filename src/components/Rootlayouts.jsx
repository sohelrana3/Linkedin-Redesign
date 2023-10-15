import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const Rootlayouts = () => {
    return (
        <>
            <header>
                <div className="navbar">
                    <div className="nav-img">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav-user">
                        <img src={logo} alt="user" />
                        <h2>Sohel</h2>
                    </div>
                </div>
            </header>
            <div className="out-pages">
                <Outlet />
            </div>
        </>
    );
};

export default Rootlayouts;
