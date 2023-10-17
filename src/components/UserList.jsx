import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

// firbase
import {
    getDatabase,
    set,
    ref,
    onValue,
    push,
    remove,
} from "firebase/database";

const UserList = () => {
    const db = getDatabase();
    let [user, setuser] = useState([]);
    let [userFriend, setuserFriend] = useState({});
    let [friendrequest, setfriendrequest] = useState([]);
    let [friend, setfriend] = useState([]);

    // react useSelector
    let userData = useSelector((state) => state.user.logUser);

    //useEffect
    useEffect(() => {
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setuser(arr);
        });
        // userFriendRef
        const userFriendRef = ref(db, "users/" + userData.uid);
        onValue(userFriendRef, (snapshot) => {
            setuserFriend({ ...snapshot.val(), id: snapshot.key });
        });

        //friendrequest--------------------
        const friendrequestRef = ref(db, "LinkFriendRequest/");
        onValue(friendrequestRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().receiveid + item.val().sentid);
            });
            setfriendrequest(arr);
        });
        //friendtRef--------------------
        const friendtRef = ref(db, "Link-Friend/");
        onValue(friendtRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().receiveid + item.val().sentid);
            });
            setfriend(arr);
        });
    }, []);

    let handleConnect = (item) => {
        set(ref(db, "LinkFriendRequest/" + item.id), {
            receiveid: item.id,
            receivename: item.username,
            receivecover_picture: item.cover_picture,
            receivephotoURL: item.photoURL,
            sentid: userFriend.id,
            sentname: userFriend.username,
            sentcover_picture: userFriend.cover_picture,
            sentphotoURL: userFriend.photoURL,
        }).then(() => {
            console.log("friend request done");
        });
    };
    //handleCancel
    let handleCancel = (item) => {
        remove(ref(db, "LinkFriendRequest/" + item.id));
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
                                    {item.tag == "" ? (
                                        <p>Please Your Tagline...</p>
                                    ) : (
                                        <p>{item.tag}</p>
                                    )}
                                    {friendrequest.includes(
                                        item.id + userData.uid
                                    ) ? (
                                        <button
                                            onClick={() => handleCancel(item)}
                                        >
                                            Cancel
                                        </button>
                                    ) : friend.includes(
                                          item.id + userData.uid
                                      ) ||
                                      friend.includes(
                                          userData.uid + item.id
                                      ) ? (
                                        <button>Friend</button>
                                    ) : (
                                        <button
                                            onClick={() => handleConnect(item)}
                                        >
                                            Join
                                        </button>
                                    )}
                                </div>
                            </Grid>
                        )
                )}
            </Grid>
        </div>
    );
};

export default UserList;
