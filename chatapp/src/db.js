import firebase from "firebase/compat/app";
import "firebase/compat/database";
import 'firebase/compat/firestore';

const config = {
    //API ANAHTARI
    apiKey: "AIzaSyC5FMz58aNK0SpXNmowsIZ6k6TnXbIYp7U",
    authDomain: "firechat-vue-1752d.firebaseapp.com",
    projectId: "firechat-vue-1752d",
    storageBucket: "firechat-vue-1752d.appspot.com",
    messagingSenderId: "298682850767",
    appId: "1:298682850767:web:a125bc9a88905ea26006ba"

}

const db  =firebase.initializeApp(config);
export default db;