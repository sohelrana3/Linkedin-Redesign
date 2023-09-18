import React from "react";
import { Outlet } from "react-router-dom";

const Rootlayouts = () => {
    return (
        <>
            <div>Rootlayouts</div>
            <div><Outlet /></div>
        </>
    );
};

export default Rootlayouts;
