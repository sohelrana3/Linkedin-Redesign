import { useState } from "react";
import { TextField, Button, Grid, Alert } from "@mui/material";
import logo from "../assets/logo.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginData } from "../Slice/user/userSlice";

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
    let dispatch = useDispatch();

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
            .then((user) => {
                // Signed in
                console.log(user);
                dispatch(loginData(user.user));
                localStorage.setItem("user", JSON.stringify(user.user));
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
                setvalue({
                    ...value,
                    error: "errr",
                });
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
                    {value.error.includes("email") && (
                        <Alert severity="error">{value.error}</Alert>
                    )}

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
                        {value.error.includes("password") && (
                            <Alert severity="error">{value.error}</Alert>
                        )}
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
