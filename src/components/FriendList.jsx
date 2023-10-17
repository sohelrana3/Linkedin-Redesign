import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import {
    getDatabase,
    set,
    push,
    ref,
    onValue,
    remove,
} from "firebase/database";
const FriendList = () => {
    const db = getDatabase();
    let [friend, setfriend] = useState([]);

    let userData = useSelector((state) => state.user.logUser);

    useEffect(() => {
        const friendRef = ref(db, "Link-Friend/");
        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (
                    userData.uid == item.val().receiveid ||
                    userData.uid == item.val().sentid
                ) {
                    arr.push({ ...item.val(), id: item.key });
                }
                console.log(item.val());
            });
            setfriend(arr);
            console.log(arr);
        });
    }, []);
    return (
        <div className="friendrequest">
            <h2>Friend List</h2>
            {friend == "" ? (
                <div className="no-friend">
                    <h3>No Friend Request</h3>
                </div>
            ) : (
                <Grid container spacing={2}>
                    {friend.map((item) => (
                        <Grid item xs={3}>
                            <div className="user-profile">
                                {/* banner images */}
                                {userData.uid == item.receiveid ? (
                                    <img
                                        className="banner"
                                        src={item.sentcover_picture}
                                        alt="banner"
                                    />
                                ) : (
                                    <img
                                        className="banner"
                                        src={item.receivecover_picture}
                                        alt="banner"
                                    />
                                )}
                                {/* profile images */}
                                {userData.uid == item.receiveid ? (
                                    <img
                                        className="profile"
                                        src={item.sentphotoURL}
                                        alt="profile"
                                    />
                                ) : (
                                    <img
                                        className="profile"
                                        src={item.receivephotoURL}
                                        alt="profile"
                                    />
                                )}
                                {userData.uid == item.receiveid ? (
                                    <h2>{item.sentname}</h2>
                                ) : (
                                    <h2>{item.receivename}</h2>
                                )}

                                <button>Friend</button>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default FriendList;
