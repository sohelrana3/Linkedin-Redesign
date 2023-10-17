import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
// firbase
import { getDatabase, set, push, ref, onValue, remove } from "firebase/database";

const FriendRequest = () => {
    const db = getDatabase();
    let [user, setuser] = useState([]);
    // let [valueTag, setvalueTag] = useState([]);
    let userData = useSelector((state) => state.user.logUser);

    //useEffect
    useEffect(() => {
        const userRef = ref(db, "LinkFriendRequest/");
        onValue(userRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().receiveid) {
                    console.log({ ...item.val(), id: item.key });
                    arr.push({ ...item.val(), id: item.key });
                    console.log(arr);
                }
            });
            setuser(arr);
            console.log(arr);
        });
    }, []);

    let handleCancel = (item)=>{
        console.log("car");
        remove(ref(db, "LinkFriendRequest/" + item.id));
    }
    let handleAccept = (item)=>{
        set(push(ref(db, "Link-Friend/")), {
            ...item,
        }).then(() => {
            remove(ref(db, "LinkFriendRequest/" + item.id));
        });
    }
    return (
        <div className="friendrequest">
            <h2>Friend Request List</h2>
            {user == "" ? (
                <div className="no-friend">
                    <h3>No Friend Request</h3>
                </div>
            ) : (
                <Grid container spacing={2}>
                    {user.map((item) => (
                        <Grid item xs={3}>
                            <div className="user-profile">
                                <img
                                    className="banner"
                                    src={item.sentcover_picture}
                                    alt="banner"
                                />
                                <img
                                    className="profile"
                                    src={item.sentphotoURL}
                                    alt="profile"
                                />
                                <h2>{item.sentname}</h2>

                                <p>{item.tag}</p>
                                <div className="btn-group">
                                    <button onClick={()=> handleAccept(item)}>accept</button>
                                    <button onClick={()=> handleCancel(item)}>Cancel</button>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default FriendRequest;
