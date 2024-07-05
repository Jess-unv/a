import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';


const app = firebase.initializeApp({
  apiKey: "AIzaSyBJAi2qtnKPmZyCoYD3M3VtZizSXtDyGfU",
  authDomain: "apuestas-bade4.firebaseapp.com",
  projectId: "apuestas-bade4",
  storageBucket: "apuestas-bade4.appspot.com",
  messagingSenderId: "899890043968",
  appId: "1:899890043968:web:8836bf13e29584c83ad3a5"
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();
