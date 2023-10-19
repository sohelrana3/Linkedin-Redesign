import React, { useEffect, useState } from "react";
import { BsFillSendFill, BsFillFileImageFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

// firebase/storage
import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
// firebase database
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { Link } from "react-router-dom";
const Feed = () => {
    const auth = getAuth();
    const storage = getStorage();
    const db = getDatabase();
    let Navigate = useNavigate();
    let [inputValue, setinputValue] = useState("");
    let [post, setpost] = useState([]);
    let [user, setuser] = useState({});
    let [friend, setfriend] = useState([]);
    let [imagesUrl, setimagesUrl] = useState("");
    let userData = useSelector((state) => state.user.logUser);
    let handleChange = (e) => {
        setinputValue(e.target.value);
    };
    let handleFileChange = (e) => {
        const storageRef = imgref(
            storage,
            `${userData.uid}${e.target.files[0].name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setimagesUrl(downloadURL);
                });
            }
        );
    };

    let handleSubmit = () => {
        set(push(ref(db, "Linkdin-post/")), {
            postAdmin: userData.displayName,
            postId: userData.uid,
            post: inputValue,
            img: imagesUrl,
            tag: user.tag,
            photoURL: user.photoURL,
            date: `${new Date().getFullYear()}- ${
                new Date().getMonth() + 1
            }- ${new Date().getDate()} ${new Date().getHours()}: ${new Date().getMinutes()}`,
        }).then(() => {
            console.log("sing");
            setinputValue("");
            setimagesUrl("");
        });
    };
    //lodgout
    let handleLogout = () => {
        console.log("log");
        signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
                Navigate("/");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    useEffect(() => {
        const posttRef = ref(db, "Linkdin-post/");
        onValue(posttRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setpost(arr);
        });
        //

        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                if (userData.uid == item.key) {
                    setuser({ ...item.val(), id: item.key });
                }
            });
            console.log(user);
        });
        //
        const friendRef = ref(db, "Link-Friend/");
        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().receiveid) {
                    arr.push(item.val().sentid);
                    console.log(arr);
                } else if (userData.uid == item.val().sentid) {
                    arr.push(item.val().receiveid);
                    console.log(arr);
                }
            });
            setfriend(arr);
        });
    }, []);
    return (
        <div className="feed">
            <div className="feed-post">
                <div className="post">
                    <div className="post-top">
                        <h3>New post</h3>
                        <div className="post-input">
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="What’s on your mind?"
                                value={inputValue}
                            />
                            <label>
                                <BsFillFileImageFill className="file" />
                                <input
                                    onChange={handleFileChange}
                                    type="file"
                                    hidden
                                />
                            </label>

                            <button onClick={handleSubmit}>
                                <BsFillSendFill />
                            </button>
                        </div>
                    </div>
                </div>
                {/* map */}
                <div class="link-post">
                    {post.map((item) =>
                        userData.uid == item.postId ? (
                            <div className="post-content">
                                <div className="post-icon">
                                    <BsThreeDots />
                                </div>
                                <div className="post-body">
                                    <div className="post-profile">
                                        <img
                                            src={item.photoURL}
                                            alt="profile"
                                        />
                                        <div>
                                            <h3>{item.postAdmin}</h3>
                                            <p>{item.tag}</p>
                                            <p style={{fontSize:"12px", color: "e5e5e5", marginTop: "4px"}}>
                                                {moment(
                                                    item.date,
                                                    "YYYYMMDD hh:mm"
                                                ).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="post-user">
                                        <p>{item.post}</p>
                                        {item.img && (
                                            <img src={item.img} alt="post" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            friend.map(
                                (id) =>
                                    item.postId == id && (
                                        <div className="post-content">
                                            <div className="post-icon">
                                                <BsThreeDots />
                                            </div>
                                            <div className="post-body">
                                                <div className="post-profile">
                                                    <img
                                                        src={item.photoURL}
                                                        alt="profile"
                                                    />
                                                    <div>
                                                        <h3>
                                                            {item.postAdmin}
                                                        </h3>
                                                        <p>{item.tag}</p>
                                                        <p style={{fontSize:"12px", color: "e5e5e5", marginTop: "4px"}}>
                                                            {moment(
                                                                item.date,
                                                                "YYYYMMDD"
                                                            ).fromNow()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="post-user">
                                                    <p>{item.post}</p>
                                                    {item.img && (
                                                        <img
                                                            src={item.img}
                                                            alt="post"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )
                        )
                    )}
                </div>
            </div>
            <div className="feed-profile">
                <div className="user-profile">
                    <img
                        className="banner"
                        src={user.cover_picture}
                        alt="banner"
                    />
                    <img
                        className="profile"
                        src={user.photoURL}
                        alt="profile"
                    />
                    <Link to="/linkedin/profile">
                        <h2>{user.username}</h2>
                    </Link>
                    <p>{user.tag}</p>
                    <button onClick={() => handleLogout(item)}>LogOut</button>
                </div>
            </div>
        </div>
    );
};

export default Feed;
