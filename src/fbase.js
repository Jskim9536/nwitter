// Import the functions you need from the SDKs you need
/* eslint-disable */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { fireEvent } from "@testing-library/react";
import "firebase/compat/storage";
// import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6-dfG_4ynoHfxwnGVzQiGgwsgF-a657k",
  authDomain: "nwitter-60952.firebaseapp.com",
  projectId: "nwitter-60952",
  storageBucket: "nwitter-60952.appspot.com",
  messagingSenderId: "45732862855",
  appId: "1:45732862855:web:bd1943337cd72ab3ab5122",
  measurementId: "G-EXJL98WJK6"
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const firebaseInstance = firebase;
export const dbService = getFirestore();
export const storageService = firebase.storage();
