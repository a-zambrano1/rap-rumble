import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const FirebaseConfig = {
    apiKey: "93f3b1ce-2729-4882-9b06-4586c6c8a487b06-4586c6c8a487",
    authDomain: "rap-rumble.firebaseapp.com",
    projectId: "rap-rumble",
    storageBucket: "rap-rumble.appspot.com",
    messagingSenderId: "105",
    appId: "1:105:web:5",
    measurementId: "G-5",
    anotherToken: "92ba97dd-a40b-4bcb-b706-48d2bf3274e7"
};

const app = initializeApp(FirebaseConfig);

const storage = getStorage(app);

export { storage, ref, getDownloadURL };