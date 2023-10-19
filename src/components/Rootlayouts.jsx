import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const Rootlayouts = () => {
    const db = getDatabase();
    let [user, setuser] = useState({});
    let userData = useSelector((state) => state.user.logUser);

    useEffect(() => {
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                if (userData.uid == item.key) {
                    setuser(item.val());
                    console.log(item.val());
                }
            });
        });
    }, []);
    return (
        <>
            <header>
                <div className="navbar">
                    <div className="nav-img">
                        <Link to="/linkedin">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="nav-user">
                        <img src={user.photoURL} alt="user" />
                        <div>
                            <h2>{user.username}</h2>
                            <p>{user.tag}</p>
                        </div>
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
