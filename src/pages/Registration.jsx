import React from "react";
import { TextField, Button } from "@mui/material";

const Registration = () => {
    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
            />
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
            />
            <Button variant="contained">Contained</Button>
        </div>
    );
};

export default Registration;
