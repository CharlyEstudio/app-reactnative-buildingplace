import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC0uQqhGgHow7lISx-0cm2M0IxYPvqjLxU",
    authDomain: "building-place.firebaseapp.com",
    projectId: "building-place",
    storageBucket: "building-place.appspot.com",
    messagingSenderId: "509944076446",
    appId: "1:509944076446:web:4996f618e2db469b70038f",
    measurementId: "G-NCDF5JL8B0"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);