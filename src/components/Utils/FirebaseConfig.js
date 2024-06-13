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
    anotherToken: "e10c9eaa-2917-4735-b7a5-b859a4cd5967"
};

const app = initializeApp(FirebaseConfig);

const storagePictures = getStorage(app);

export { storagePictures, ref, getDownloadURL };