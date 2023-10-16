import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

// firbase
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
    const db = getDatabase();
    let [user, setuser] = useState([]);
    let userData = useSelector((state) => state.user.logUser);

    //use
    useEffect(() => {
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setuser(arr);
        });
        console.log(user);
    }, []);

    let handleConnect = (item) => {
        console.log(item);
    };
    return (
        <div>
            <h2>User List</h2>
            <Grid container spacing={2}>
                {user.map(
                    (item) =>
                        userData.uid !== item.id && (
                            <Grid item xs={3}>
                                <div className="user-profile">
                                    <img
                                        className="banner"
                                        src={item.cover_picture}
                                        alt="banner"
                                    />
                                    <img
                                        className="profile"
                                        src={item.photoURL}
                                        alt="profile"
                                    />
                                    <h2>{item.username}</h2>
                                    <p>fontend developer</p>
                                    <button onClick={() => handleConnect(item)}>
                                        Join
                                    </button>
                                </div>
                            </Grid>
                        )
                )}
            </Grid>
        </div>
    );
};

export default UserList;
