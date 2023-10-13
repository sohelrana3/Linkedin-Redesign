import React from "react";
import { TextField, Button, Grid, Alert } from "@mui/material";
import logo from "../assets/logo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const inishallvalu = {
    email: "",
    fullName: "",
    password: "",
    error: "",
};

const Registration = () => {
    let [show, setshow] = useState(false);
    let [value, setvalue] = useState(inishallvalu);
    //handleChange
    let handleChange = (e) => {
        setvalue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };
    //handleSingup
    let handleSingup = () => {
        let { email, fullName, password } = value;
        if (!email) {
            setvalue({
                ...value,
                error: "Please your email addres ",
            });
            console.log(value);
            return;
        }

        if (!fullName) {
            setvalue({
                ...value,
                error: "Please your fullName",
            });
            return;
        }
        if (!password) {
            setvalue({
                ...value,
                error: "Please Your password ",
            });
            return;
        }

        setvalue({
            ...value,
            error: "",
        });
    };
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
                    {/* -------------------Email Addres-------------------*/}

                    <TextField
                        id="outlined-basic"
                        label="Email Addres"
                        variant="outlined"
                        margin="dense"
                        onChange={handleChange}
                        name="email"
                        value={value.email}
                    />
                    {value.error.includes("email") && (
                        <Alert severity="error">{value.error}</Alert>
                    )}

                    {/* -------------------FullName-------------------*/}

                    <TextField
                        id="outlined-basic"
                        label="FullName"
                        variant="outlined"
                        margin="dense"
                        onChange={handleChange}
                        name="fullName"
                        value={value.fullName}
                    />
                    {value.error.includes("fullName") && (
                        <Alert severity="error">{value.error}</Alert>
                    )}
                    {/* -------------------password-------------------*/}

                    <div className="password-icon">
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            margin="dense"
                            onChange={handleChange}
                            name="password"
                            value={value.password}
                        />
                        {value.error.includes("password") && (
                            <Alert severity="error">{value.error}</Alert>
                        )}

                        {/* -------------------show password icon-------------------*/}
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
                        Already have An Account{" "}
                        <Link style={{ color: "#086FA4" }} to="/login">
                            Login
                        </Link>
                    </h4>

                    <Button onClick={handleSingup} variant="contained">
                        Sing up
                    </Button>
                </div>
            </div>
        </Grid>
    );
};

export default Registration;
