// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD385uW8ZAEp_YPGpaaxWayLzhuwNsxoEk",
    authDomain: "drag-and-drop-8038e.firebaseapp.com",
    projectId: "drag-and-drop-8038e",
    storageBucket: "drag-and-drop-8038e.appspot.com",
    messagingSenderId: "435204630801",
    appId: "1:435204630801:web:a7d23e36088f0af2e844b0",
    measurementId: "G-D9ZG40CY9S"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
