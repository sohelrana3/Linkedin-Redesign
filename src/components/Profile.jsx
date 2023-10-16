import React from "react";
import { useState, createRef, ref, useEffect } from "react";
import { useSelector } from "react-redux";
import banner from "../assets/banner.png";
import { Button, Typography, Modal, Box, TextField } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineMail, AiFillLinkedin } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as rref, set, onValue } from "firebase/database";

// Modal style
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Profile = () => {
    const db = getDatabase();
    const storage = getStorage();
    let userData = useSelector((state) => state.user.logUser);

    let [user, setuser] = useState({});
    let [inputtag, setinputtag] = useState("");
    let [valueTag, setvalueTag] = useState();
    let [progressbar, setprogressbar] = useState(0);

    // modal
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [opentag, setOpentag] = useState(false);
    const [openContarct, setOpenContarct] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpen2 = () => setOpen2(true);
    const handleOpentag = () => setOpentag(true);
    const handleOpenContract = () => setOpenContarct(true);
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    const handleClosetag = () => setOpentag(false);
    const handleCloseContract = () => setOpenContarct(false);
    // banner img & profile img
    const [imageProfile, setimageProfile] = useState();
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();

    // cropar img

    const onChange = (e) => {
        setImage(e.target.files[0]);
    };
    const onChangeProfile = (e) => {
        setimageProfile(e.target.files[0]);
    };
    // useEffect

    useEffect(() => {
        console.log(userData);
        const coverRef = rref(db, "users/" + userData.uid);
        onValue(coverRef, (snapshot) => {
            setuser(snapshot.val());
        });
        // tagline
        const tagRef = rref(db, "tagline/" + userData.uid);
        onValue(tagRef, (snapshot) => {
            console.log(snapshot.val().tag);
            setvalueTag(snapshot.val().tag);
            // setvalueTag(snapshot.val());
            // console.log(valueTag);
        });
    }, []);
    // handleCover
    let handleCover = () => {
        console.log(image.name);
        const storageRef = imgref(storage, `cover${userData.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setprogressbar(progress);
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    set(rref(db, "users/" + userData.uid), {
                        ...user,
                        cover_picture: downloadURL,
                    }).then(() => {
                        setOpen(false);
                    });
                });
            }
        );
        console.log(progressbar);
    };
    let handleProfileImg = () => {
        console.log(user);
        const storageRef = imgref(storage, `profile${userData.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, imageProfile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setprogressbar(progress);
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    set(rref(db, "users/" + userData.uid), {
                        ...user,
                        photoURL: downloadURL,
                    }).then(() => {
                        setOpen2(false);
                    });
                });
            }
        );
    };

    //handleTagSubmit
    let handleTagSubmit = () => {
        console.log(inputtag);
        set(rref(db, "tagline/" + userData.uid), {
            tag: inputtag,
        }).then(() => {
            setOpentag(false);
        });
    };
    return (
        <div className="Profile">
            {/* --------------------Profile info-------------------- */}
            <div className="banner">
                <img src={user.cover_picture} alt="banner" />
                <Button variant="contained" onClick={handleOpen}>
                    Edit Cover Photo
                </Button>

                {/* ------------Cover Photo Modal start------------  */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Edit Cover Photo
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className="model-cover">
                                <input type="file" onChange={onChange} />

                                <Button onClick={handleCover}>Upload</Button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
                {/* ----------------Cover Photo Modal End---------------- */}
            </div>
            <div className="profile-info">
                <div className="profile-img">
                    <img onClick={handleOpen2} src={user.photoURL} alt="user" />
                    {/* ------------Profile Photo Modal start------------  */}
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Edit Profile Photo
                            </Typography>
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                <div className="model-cover">
                                    <input
                                        type="file"
                                        onChange={onChangeProfile}
                                    />

                                    <Button onClick={handleProfileImg}>
                                        Upload
                                    </Button>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                    {/* ----------------Cover Photo Modal End---------------- */}
                </div>
                <div className="profile-left">
                    <div className="profile-name">
                        <h2>{userData.displayName}</h2>
                        <span>Saint Petersburg, Russian Federation</span>
                    </div>
                    <div className="tag-edit">
                        {valueTag ? (
                            <p>{valueTag}</p>
                        ) : (
                            <p>Please Your Tagline...</p>
                        )}

                        <FiEdit onClick={handleOpentag} className="icon" />
                        {/* ------------Edit TagLine Modal start------------  */}
                        <Modal
                            open={opentag}
                            onClose={handleClosetag}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Edit TagLine
                                </Typography>
                                <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                >
                                    <div className="inputTag">
                                        <input
                                            type="text"
                                            placeholder="Please your Tagline..."
                                            onChange={(e) =>
                                                setinputtag(e.target.value)
                                            }
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={handleTagSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Typography>
                            </Box>
                        </Modal>
                        {/* ----------------Edit TagLine Modal End---------------- */}
                    </div>
                    <Button variant="contained" onClick={handleOpenContract}>
                        contract info
                    </Button>

                    {/* ------------Contract  Modal start------------  */}
                    <Modal
                        open={openContarct}
                        onClose={handleCloseContract}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                <div className="Contract-top">
                                    <h3>{userData.displayName}</h3>
                                    <RxCross2
                                        style={{ cursor: "pointer" }}
                                        onClick={handleCloseContract}
                                    />
                                </div>
                            </Typography>
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                <div className="Contract-body">
                                    <h4 style={{ paddingBottom: "10px" }}>
                                        Contract Info
                                    </h4>
                                    <div>
                                        <div className="contract-info">
                                            <AiFillLinkedin />
                                            <h4>Your profile</h4>
                                        </div>
                                        <p
                                            style={{
                                                margin: "0 30px",
                                                paddingBottom: "10px",
                                            }}
                                        >
                                            linkdin.com/in/
                                            {userData.displayName}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="contract-info">
                                            <AiOutlineMail />
                                            <h4>Your Email</h4>
                                        </div>
                                        <p style={{ margin: "0 30px" }}>
                                            {userData.email}
                                        </p>
                                    </div>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                    {/* ----------------Contract Modal End---------------- */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
