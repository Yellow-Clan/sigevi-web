// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here
    apiKey: "AIzaSyC0Jw6Oshth5nAzsQhRRMsduKb7GyP8lpU",
    authDomain: "logincrud-flutter.firebaseapp.com",
    projectId: "logincrud-flutter",
    storageBucket: "logincrud-flutter.appspot.com",
    messagingSenderId: "725036368708",
    appId: "1:725036368708:web:870410a9a3cbc092280d11",
    measurementId: "G-6QMDXK6SRC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);




export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
 
export const saveAlumn = (alumname, alumnciclo, codalumno) =>
  addDoc(collection(db, "alumnos"), { alumname, alumnciclo, codalumno});


export const onGetAlumns = (callback) =>
  onSnapshot(collection(db, "alumnos"), callback);


/**
 *
 * @param {string} id Task ID
 */

export const deleteAlumn = (id) => deleteDoc(doc(db, "alumnos", id));

export const getAlumn = (id) => getDoc(doc(db, "alumnos", id));

export const updateAlumn = (id, newFields) =>
  updateDoc(doc(db, "alumnos", id), newFields);

export const getAlumns = () => getDocs(collection(db, "alumnos"));
