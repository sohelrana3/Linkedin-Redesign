import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import logo from "../assets/logo.png"

const Registration = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
        >
            <div className="box">
                <div className="headdingTop">
                    <img src={logo} alt="logo" />
                    <h2>Get started with easily register</h2>
                    <h4>Free register and you can enjoy it</h4>
                </div>
                <div className="inputBox">
                    <TextField
                        id="outlined-basic"
                        label="Email Addres"
                        variant="outlined"
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Full name"
                        variant="outlined"
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        margin="dense"
                    />
                    <Button variant="contained">Sing up</Button>
                </div>
            </div>
        </Grid>
    );
};

export default Registration;
