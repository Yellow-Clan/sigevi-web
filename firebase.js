// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
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

// export auth
export const auth = getAuth();


export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
 
export const saveTask = (projectname, infproject, feini, fefin) =>
  addDoc(collection(db, "projects"), { projectname, infproject, feini, fefin});


export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "projects"), callback);


/**
 *
 * @param {string} id Task ID
 */

export const deleteTask = (id) => deleteDoc(doc(db, "projects", id));

export const getTask = (id) => getDoc(doc(db, "projects", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "projects", id), newFields);

export const getTasks = () => getDocs(collection(db, "projects"));
