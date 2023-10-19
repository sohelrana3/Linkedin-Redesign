import React, { useEffect, useState } from "react";
import { BsFillSendFill, BsFillFileImageFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
// firebase/storage
import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
// firebase database
import { getDatabase, push, ref, set, onValue } from "firebase/database";

const Post = () => {
    const storage = getStorage();
    const db = getDatabase();
    let [user, setuser] = useState({});
    let [inputValue, setinputValue] = useState("");
    let [post, setpost] = useState([]);
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
    let handleKeyPrees = (e) => {
        if (e.key == "Enter") {
            handleSubmit();
        }
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

        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                if (userData.uid == item.key) {
                    setuser(item.val());
                    console.log(user);
                }
            });
        });
    }, []);
    return (
        <>
            <div className="post">
                <div className="post-top">
                    <h3>New post</h3>
                    <div className="post-input">
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="What’s on your mind?"
                            value={inputValue}
                            onKeyUp={handleKeyPrees}
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
                {post.map((item) => (
                    <>
                        {userData.uid == item.postId && (
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
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    color: "e5e5e5",
                                                    marginTop: "2px",
                                                }}
                                            >
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
                        )}
                    </>
                ))}
            </div>
        </>
    );
};

export default Post;
