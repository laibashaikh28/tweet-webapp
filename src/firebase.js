import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCyhPGuGP60MrcQcNlYLhMntbV56N3enZ4",
    authDomain: "tweet-webapp-4b0f3.firebaseapp.com",
    projectId: "tweet-webapp-4b0f3",
    storageBucket: "tweet-webapp-4b0f3.appspot.com",
    messagingSenderId: "973454466947",
    appId: "1:973454466947:web:fe936635a04cee8a07e0b6"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;