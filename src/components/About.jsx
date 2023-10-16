import { Button } from "@mui/material";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

const About = () => {
    let [show, setshow] = useState(false);
    return (
        <div className="about">
            <h2>About</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ width: "95%" }}>
                    hi I'm more experienced in eCommerce web projects and mobile
                    banking apps, but also like to work with creative projects{" "}
                    {show && (
                        <span>
                            such as landing pages or unusual corporate websites.
                        </span>
                    )}
                </p>

                <FiEdit />
            </div>
            {show ? (
                <button onClick={() => setshow(!show)}>lss more</button>
            ) : (
                <button onClick={() => setshow(!show)}>see more</button>
            )}
        </div>
    );
};

export default About;
