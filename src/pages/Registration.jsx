import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import logo from "../assets/logo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
    let [show, setshow] = useState(false);
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
                    <div className="password-icon">
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            margin="dense"
                            type={show ? "text" : "password"}
                        />
                        {show ? (
                            <AiFillEye
                                onClick={() => setshow(!show)}
                                className="eye-icon"
                            />
                        ) : (
                            <AiFillEyeInvisible
                                onClick={() => setshow(!show)}
                                className="eye-icon"
                            />
                        )}
                    </div>
                    <h4 style={{ color: "#11175D" }}>
                        Already have An Account <Link style={{color: "#086FA4"}} to="/login">Login</Link>
                    </h4>

                    <Button variant="contained">Sing up</Button>
                </div>
            </div>
        </Grid>
    );
};

export default Registration;
