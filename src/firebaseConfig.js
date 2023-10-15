// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-9Px1bqFqc2us_-uEzKktxtm_Iy21GFA",
    authDomain: "chatt-1a90f.firebaseapp.com",
    databaseURL: "https://chatt-1a90f-default-rtdb.firebaseio.com",
    projectId: "chatt-1a90f",
    storageBucket: "chatt-1a90f.appspot.com",
    messagingSenderId: "1028934437053",
    appId: "1:1028934437053:web:b57690f1205be95e180fd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;
