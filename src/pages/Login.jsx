import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import logo from "../assets/logo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let inishallvalu = {
    email: "",
    password: "",
    error: "",
};

const Login = () => {
    const auth = getAuth();
    let [show, setshow] = useState(false);
    let [value, setvalue] = useState(inishallvalu);
    const notify = (mess) => toast(mess);
    const navigiton = useNavigate();

    //handleChange
    let handleChange = (e) => {
        setvalue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    // handleLogin button
    let handleLogin = () => {
        let { email, password } = value;
        if (!email) {
            setvalue({
                ...value,
                error: "Please your email addres ",
            });
            console.log(value);
            return;
        }
        if (!password) {
            setvalue({
                ...value,
                error: "Please Your password ",
            });
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((login) => {
                // Signed in
                console.log(login);
                notify("Login Success");
                setvalue({
                    email: "",
                    password: "",
                });
                navigiton("/linkedin");
                // ...
            })
            .catch((error) => {
                console.log(error);
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
                    <TextField
                        id="outlined-basic"
                        label="Email Addres"
                        variant="outlined"
                        margin="dense"
                        onChange={handleChange}
                        name="email"
                    />
                    <div className="password-icon">
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            margin="dense"
                            onChange={handleChange}
                            type={show ? "text" : "password"}
                            name="password"
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
                        Don't Have An Account{" "}
                        <Link style={{ color: "#086FA4" }} to="/">
                            Sing Up
                        </Link>
                    </h4>

                    <Button variant="contained" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </Grid>
    );
};

export default Login;
