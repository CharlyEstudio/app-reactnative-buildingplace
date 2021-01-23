import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBE9hfgHAeamDe0DfR8a1VNHxoMsDjIdRc",
    authDomain: "tenedores-29665.firebaseapp.com",
    projectId: "tenedores-29665",
    storageBucket: "tenedores-29665.appspot.com",
    messagingSenderId: "954173533283",
    appId: "1:954173533283:web:4712b811471b650c621c56"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);