import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyDYEQhX6UCZvICZis8rRlcF-6EDWS29GKo",
    authDomain: "manifest-generator.firebaseapp.com",
    projectId: "manifest-generator",
    storageBucket: "manifest-generator.appspot.com",
    messagingSenderId: "706559109632",
    appId: "1:706559109632:web:faf52db283eeaa7b5086e5",
    measurementId: "G-BB0LM9E0ZR"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const functions = firebase.functions();

export {storage, functions}