// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import firebase from 'firebase/compat/app'
import  'firebase/compat/auth';
import   'firebase/compat/firestore';
import   'firebase/compat/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBV8d9N5DczysX-wmGeYNmRVrdM152kaIg",
    authDomain: "reels-clone-rray.firebaseapp.com",
    projectId: "reels-clone-rray",
    storageBucket: "reels-clone-rray.appspot.com",
    messagingSenderId: "774795123470",
    appId: "1:774795123470:web:6641886f96651d8d8c155f"
  };

 
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore()

export const database = {
  users : firestore.collection('users') ,
  getTimestamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage =firebase.storage()
