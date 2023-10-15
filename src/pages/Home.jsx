import { useState, createRef, ref, useEffect } from "react";
import { useSelector } from "react-redux";
import banner from "../assets/banner.png";
import { Button, Typography, Modal, Box } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
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

const Home = () => {
    const db = getDatabase();
    const storage = getStorage();
    let userData = useSelector((state) => state.user.logUser);

    let [user, setuser] = useState({});
    let [progressbar, setprogressbar] = useState(0);

    // modal
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // cropar img

    const onChange = (e) => {
        setImage(e.target.files[0]);
    };
    // useEffect

    useEffect(() => {
        const coverRef = rref(db, "users/" + userData.uid);
        onValue(coverRef, (snapshot) => {
            setuser(snapshot.val());
        });
    }, []);
    // handleCover
    let handleCover = () => {
        console.log(image.name);
        const storageRef = imgref(storage, `${image.name}`);
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
                        username: userData.displayName,
                        email: userData.email,
                        photoURL:
                            "https://i.ibb.co/Sx0KcjN/User-Profile-PNG-Image.png",
                        cover_picture: downloadURL,
                    }).then(() => {
                        setOpen(false);
                    });
                });
            }
        );
        console.log(progressbar);
    };
    return (
        <div className="home-page">
            {/* --------------------Profile info-------------------- */}

            <div className="Profile">
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
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                <div className="model-cover">
                                    <input type="file" onChange={onChange} />

                                    <Button onClick={handleCover}>
                                        Upload
                                    </Button>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                    {/* ----------------Cover Photo Modal End---------------- */}
                </div>
                <div className="profile-info">
                    <div className="profile-img">
                        <img src={user.photoURL} alt="user" />
                    </div>
                    <div>
                        <h2>{userData.displayName}</h2>
                        <span>Saint Petersburg, Russian Federation</span>
                        <p>
                            Freelance UX/UI designer, 80+ projects in web
                            design, mobile apps (iOS & android) and creative
                            projects. Open to offers.
                        </p>
                        <button>contract info</button>
                    </div>
                </div>
            </div>

            {/* --------------------------Profile tab-------------------------- */}

            <div className="Profile-tab">
                <li>a</li>
                <li>a</li>
                <li>8</li>
            </div>
        </div>
    );
};

export default Home;
