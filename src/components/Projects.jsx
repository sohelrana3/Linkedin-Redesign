import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import banner from "../assets/banner.png";
import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

const Projects = () => {
    const storage = getStorage();
    const db = getDatabase();
    let [value, setvalue] = useState([]);
    let userData = useSelector((state) => state.user.logUser);
    // handleChange
    let handleChange = (e) => {
        console.log(e.target.files[0]);
        const storageRef = imgref(storage, `projects${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    set(push(ref(db, "Linkdin-projects/")), {
                        projectsImg: downloadURL,
                        admin: userData.uid,
                    });
                });
            }
        );
    };
    //handleFileUpload
    let handleFileUpload = () => {
        console.log("file");
    };
    useEffect(() => {
        const projectsRef = ref(db, "Linkdin-projects/");
        onValue(projectsRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().admin) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setvalue(arr);
        });
    }, []);
    return (
        <div style={{ marginTop: "20px" }} className="post">
            <div className="projects">
                <h2>Projects</h2>
                <label>
                    <input onChange={handleChange} type="file" hidden />
                    <FaUpload
                        className="fileupload"
                        onClick={handleFileUpload}
                    />
                </label>
            </div>
            <div className="projects-img">
                <Grid container spacing={2}>
                    {value.map((item) => (
                        <Grid item xs={4}>
                            <img src={item.projectsImg} alt="projects" />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Projects;
